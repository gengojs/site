let fs = require("fs");
let globwatcher = require("../../lib/globwatcher/globwatcher");
let minimatch = require("minimatch");
let mocha_sprinkles = require("mocha-sprinkles");
let path = require("path");
let Promise = require("bluebird");
let shell = require("shelljs");
let should = require("should");
let touch = require("touch");
let util = require("util");

let future = mocha_sprinkles.future;
let withTempFolder = mocha_sprinkles.withTempFolder;

require("source-map-support").install();

function makeFixtures(folder, ts) {
  if (!ts) ts = Date.now() - 1000;
  [
    `${folder}/one.x`,
    `${folder}/sub/one.x`,
    `${folder}/sub/two.x`,
    `${folder}/nested/three.x`,
    `${folder}/nested/weird.jpg`
  ].map((file) => {
    shell.mkdir("-p", path.dirname(file));
    touch.sync(file, { mtime: ts });
  });
}

function fixtures(f) {
  return future(withTempFolder((folder) => {
    makeFixtures(folder);
    return f(folder);
  }));
}

// create a new globwatch, run a test, and close it
function withGlobwatcher(pattern, options, f) {
  if (f == null) {
    f = options;
    options = {};
  }
  options.persistent = false;
  let g = globwatcher.globwatcher(pattern, options);
  return g.ready.finally(() => f(g)).finally(() => g.close());
}

// capture add/remove/change into an object for later inspection
function capture(g) {
  let summary = {};

  function push(name, item) {
    if (summary[name] == null) summary[name] = [];
    summary[name].push(item);
    summary[name].sort();
  }

  g.on("added", (filename) => push("added", filename));
  g.on("deleted", (filename) => push("deleted", filename));
  g.on("changed", (filename) => push("changed", filename));
  return summary;
}

describe("globwatcher", () => {
  it("folderMatchesMinimatchPrefix", () => {
    let set = new minimatch.Minimatch("/home/commie/**/*.js", { nonegate: true }).set[0];
    globwatcher.folderMatchesMinimatchPrefix([ "", "home" ], set).should.equal(true);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie" ], set).should.equal(true);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "robey" ], set).should.equal(false);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie", "rus" ], set).should.equal(true);
    set = new minimatch.Minimatch("/home/commie/l*/*.js", { nonegate: true }).set[0];
    globwatcher.folderMatchesMinimatchPrefix([ "", "home" ], set).should.equal(true);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie" ], set).should.equal(true);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "robey" ], set).should.equal(false);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie", "rus" ], set).should.equal(false);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie", "lola" ], set).should.equal(true);
    globwatcher.folderMatchesMinimatchPrefix([ "", "home", "commie", "lola", "prissy" ], set).should.equal(false);
  });

  it("addWatch", future(() => {
    return withGlobwatcher("/~~nonexistent~~", (g) => {
      [
        "/absolute.txt",
        "/sub/absolute.txt",
        "/deeply/nested/file/why/nobody/knows.txt"
      ].forEach((f) => g.addWatch(f));
      g.watchMap.getFolders().sort().should.eql([ "/", "/deeply/nested/file/why/nobody/", "/sub/" ]);
      g.watchMap.getFilenames("/").should.eql([ "/absolute.txt" ]);
      g.watchMap.getFilenames("/sub/").should.eql([ "/sub/absolute.txt" ]);
      g.watchMap.getFilenames("/deeply/nested/file/why/nobody/").should.eql([ "/deeply/nested/file/why/nobody/knows.txt" ]);
    });
  }));

  it("can parse patterns", fixtures((folder) => {
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      g.patterns.should.eql([ `${folder}/**/*.x` ]);
      Object.keys(g.watchers).sort().should.eql([ `${folder}/`, `${folder}/nested/`, `${folder}/sub/` ]);
      g.watchMap.getFolders().sort().should.eql([ `${folder}/`, `${folder}/nested/`, `${folder}/sub/` ]);
      g.watchMap.getFilenames(`${folder}/`).should.eql([ `${folder}/one.x` ]);
      g.watchMap.getFilenames(`${folder}/nested/`).should.eql([ `${folder}/nested/three.x` ]);
      g.watchMap.getFilenames(`${folder}/sub/`).should.eql([ `${folder}/sub/one.x`, `${folder}/sub/two.x` ]);
    });
  }));

  it("can parse patterns relative to cwd", fixtures((folder) => {
    return withGlobwatcher("**/*.x", { cwd: `${folder}/sub` }, (g) => {
      g.patterns.should.eql([ `${folder}/sub/**/*.x` ]);
      Object.keys(g.watchers).sort().should.eql([ `${folder}/sub/` ]);
      g.watchMap.getFolders().sort().should.eql([ `${folder}/sub/` ]);
      g.watchMap.getFilenames(`${folder}/sub/`).should.eql([ `${folder}/sub/one.x`, `${folder}/sub/two.x` ]);
    });
  }));

  it("handles odd relative paths", fixtures((folder) => {
    return withGlobwatcher("../sub/**/*.x", { cwd: `${folder}/nested` }, (g) => {
      Object.keys(g.watchers).sort().should.eql([ `${folder}/sub/` ]);
      g.watchMap.getFolders().sort().should.eql([ `${folder}/sub/` ]);
      g.watchMap.getFilenames(`${folder}/sub/`).should.eql([ `${folder}/sub/one.x`, `${folder}/sub/two.x` ]);
    });
  }));

  it("notices new files", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      summary = capture(g);
      touch.sync(`${folder}/nested/four.x`);
      touch.sync(`${folder}/sub/not-me.txt`);
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/nested/four.x` ]
        });
      });
    });
  }));

  it("doesn't emit signals when turned off", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      summary = capture(g);
      g.stopWatches();
      return Promise.delay(50).then(() => {
        touch.sync(`${folder}/nested/four.x`);
        touch.sync(`${folder}/sub/not-me.txt`);
        g.check();
      }).then(() => {
        // just in case, make sure the timer goes off too
        return Promise.delay(g.interval * 2);
      }).then(() => {
        summary.should.eql({});
      });
    });
  }));

  it("notices new files only in cwd", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}/sub` }, (g) => {
      summary = capture(g);
      touch.sync(`${folder}/nested/four.x`);
      touch.sync(`${folder}/sub/not-me.txt`);
      touch.sync(`${folder}/sub/four.x`);
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/sub/four.x` ]
        });
      });
    });
  }));

  it("notices new files nested deeply", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      summary = capture(g);
      shell.mkdir("-p", `${folder}/nested/more/deeply`);
      touch.sync(`${folder}/nested/more/deeply/nine.x`);
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/nested/more/deeply/nine.x` ]
        });
      });
    });
  }));

  it("notices deleted files", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.unlinkSync(`${folder}/sub/one.x`);
      return g.check().then(() => {
        summary.should.eql({
          deleted: [ `${folder}/sub/one.x` ]
        });
      });
    });
  }));

  it("notices a rename as an add + delete", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.renameSync(`${folder}/sub/two.x`, `${folder}/sub/twelve.x`);
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/sub/twelve.x` ],
          deleted: [ `${folder}/sub/two.x` ]
        });
      });
    });
  }));

  it("handles a nested delete", fixtures((folder) => {
    shell.mkdir("-p", `${folder}/nested/more/deeply`);
    touch.sync(`${folder}/nested/more/deeply/here.x`);
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      shell.rm("-r", `${folder}/nested`);
      return g.check().then(() => {
        summary.should.eql({
          deleted: [ `${folder}/nested/more/deeply/here.x`, `${folder}/nested/three.x` ]
        });
      });
    });
  }));

  it("handles a changed file", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.writeFileSync(`${folder}/sub/one.x`, "gahhhhhh");
      return g.check().then(() => {
        summary.should.eql({
          changed: [ `${folder}/sub/one.x` ]
        });
      });
    });
  }));

  it("follows a safe-write", fixtures((folder) => {
    let summary = null;
    let savee = `${folder}/one.x`;
    let backup = `${folder}/one.x~`;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.writeFileSync(backup, fs.readFileSync(savee));
      fs.unlinkSync(savee);
      fs.renameSync(backup, savee);
      return g.check().then(() => {
        summary.should.eql({
          changed: [ savee ]
        });
      });
    });
  }));

  it("only emits once for a changed file", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.writeFileSync(`${folder}/one.x`, "whee1");
      return g.check().then(() => {
        summary.should.eql({
          changed: [ `${folder}/one.x` ]
        });
        return g.check();
      }).then(() => {
        summary.should.eql({
          changed: [ `${folder}/one.x` ]
        });
      });
    });
  }));

  it("emits twice if a file was changed twice", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher("**/*.x", { cwd: `${folder}` }, (g) => {
      summary = capture(g);
      fs.writeFileSync(`${folder}/one.x`, "whee1");
      return g.check().then(() => {
        summary.should.eql({
          changed: [ `${folder}/one.x` ]
        });
        fs.writeFileSync(`${folder}/one.x`, "whee123");
        return g.check();
      }).then(() => {
        summary.should.eql({
          changed: [ `${folder}/one.x`, `${folder}/one.x` ]
        });
      });
    });
  }));

  it("doesn't mind watching a nonexistent folder", fixtures((folder) => {
    return withGlobwatcher(`${folder}/not/there/*`, (g) => {
      (3).should.equal(3);
    });
  }));

  it("sees a new matching file even if the whole folder was missing when it started", future(withTempFolder((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/not/there/*`, (g) => {
      summary = capture(g);
      shell.mkdir("-p", `${folder}/not/there`);
      fs.writeFileSync(`${folder}/not/there/ten.x`, "wheeeeeee");
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/not/there/ten.x` ]
        });
      });
    });
  })));

  it("sees a new matching file even if nested folders were missing when it started", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/sub/deeper/*.x`, (g) => {
      summary = capture(g);
      shell.mkdir("-p", `${folder}/sub/deeper`);
      fs.writeFileSync(`${folder}/sub/deeper/ten.x`, "wheeeeeee");
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/sub/deeper/ten.x` ]
        });
      });
    });
  }));

  it("sees a new matching file even if the entire tree was erased and re-created", fixtures((folder) => {
    shell.rm("-rf", `${folder}/nested`);
    shell.mkdir("-p", `${folder}/nested/deeper/still`);
    touch.sync(`${folder}/nested/deeper/still/four.x`);
    let summary = null;
    return withGlobwatcher(`${folder}/**/*`, (g) => {
      summary = capture(g);
      shell.rm("-r", `${folder}/nested`);
      return g.check().then(() => {
        summary.should.eql({
          deleted: [ `${folder}/nested/deeper/still/four.x` ]
        });
        delete summary.deleted;
        shell.mkdir("-p", `${folder}/nested/deeper/still`);
        fs.writeFileSync(`${folder}/nested/deeper/still/ten.x`, "wheeeeeee");
        return g.check();
      }).then(() => {
        summary.should.eql({
          added: [ `${folder}/nested/deeper/still/ten.x` ]
        });
      });
    });
  }));

  it("sees a new matching file even if the folder exists but was empty", fixtures((folder) => {
    shell.mkdir("-p", `${folder}/nested/deeper`);
    let summary = null;
    return withGlobwatcher(`${folder}/nested/deeper/*.x`, (g) => {
      summary = capture(g);
      fs.writeFileSync(`${folder}/nested/deeper/ten.x`, "wheeeeeee");
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/nested/deeper/ten.x` ]
        });
      });
    });
  }));

  it("emits signals for folders when asked", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/**/*`, { emitFolders: true }, (g) => {
      summary = capture(g);
      shell.mkdir("-p", `${folder}/newfolder`);
      shell.rm("-r", `${folder}/nested`);
      return g.check().then(() => {
        summary.should.eql({
          added: [ `${folder}/newfolder/` ],
          deleted: [ `${folder}/nested/`, `${folder}/nested/three.x`, `${folder}/nested/weird.jpg` ]
        });
      });
    });
  }));

  it("will watch a single, non-globbed file that doesn't exist", fixtures((folder) => {
    let summary = null;
    return withGlobwatcher(`${folder}/nothing.x`, (g) => {
      summary = capture(g);
      fs.writeFileSync(`${folder}/nothing.x`, "hi!");
      return Promise.delay(g.interval).then(() => {
        summary.should.eql({
          added: [ `${folder}/nothing.x` ]
        });
      });
    });
  }));

  it("returns a currentSet", fixtures((folder) => {
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      g.currentSet().sort().should.eql([
        `${folder}/nested/three.x`,
        `${folder}/one.x`,
        `${folder}/sub/one.x`,
        `${folder}/sub/two.x`
      ]);
      shell.rm(`${folder}/sub/one.x`);
      fs.writeFileSync(`${folder}/whatevs.x`);
      return g.check().then(() => {
        g.currentSet().sort().should.eql([
          `${folder}/nested/three.x`,
          `${folder}/one.x`,
          `${folder}/sub/two.x`,
          `${folder}/whatevs.x`
        ]);
      });
    });
  }));

  describe("takes a snapshot", () => {
    it("of globs", fixtures((folder) => {
      return withGlobwatcher(`${folder}/**/*.x`, { snapshot: {} }, (g) => {
        let ts = fs.statSync(`${folder}/one.x`).mtime.getTime();
        fs.writeFileSync(`${folder}/wut.x`, "hello");
        touch.sync(`${folder}/wut.x`, { mtime: ts });
        return g.check().then(() => {
          let snapshot = g.snapshot();
          snapshot[`${folder}/one.x`].should.eql({ mtime: ts, size: 0 });
          snapshot[`${folder}/wut.x`].should.eql({ mtime: ts, size: 5 });
          snapshot[`${folder}/nested/three.x`].should.eql({ mtime: ts, size: 0 });
          snapshot[`${folder}/sub/one.x`].should.eql({ mtime: ts, size: 0 });
          snapshot[`${folder}/sub/two.x`].should.eql({ mtime: ts, size: 0 });
        });
      });
    }));

    it("of normal files", fixtures((folder) => {
      return withGlobwatcher(`${folder}/sub/two.x`, { snapshot: {} }, (g) => {
        let ts = fs.statSync(`${folder}/sub/two.x`).mtime.getTime();
        return g.check().then(() => {
          let snapshot = g.snapshot();
          snapshot[`${folder}/sub/two.x`].should.eql({ mtime: ts, size: 0 });
          fs.writeFileSync(`${folder}/sub/two.x`, "new!");
          ts = fs.statSync(`${folder}/sub/two.x`).mtime.getTime();
          return withGlobwatcher(`${folder}/sub/two.x`, { snapshot }, (g) => {
            return g.check().then(() => {
              snapshot = g.snapshot();
              snapshot[`${folder}/sub/two.x`].should.eql({ mtime: ts, size: 4 });
            });
          });
        });
      });
    }));
  });

  it("resumes from a snapshot", fixtures((folder) => {
    return withGlobwatcher(`${folder}/**/*.x`, (g) => {
      let summary = null;
      let snapshot = g.snapshot();
      g.close();
      return Promise.delay(100).then(() => {
        fs.writeFileSync(`${folder}/one.x`, "hello");
        shell.rm(`${folder}/sub/two.x`);
        touch.sync(`${folder}/sub/nine.x`);
        g = globwatcher.globwatcher(`${folder}/**/*.x`, { persistent: false, snapshot: snapshot });
        summary = capture(g);
        return g.ready;
      }).then(() => {
        summary.should.eql({
          added: [ `${folder}/sub/nine.x` ],
          changed: [ `${folder}/one.x` ],
          deleted: [ `${folder}/sub/two.x` ]
        });
      });
    });
  }));
});
