let fs = require("fs");
let mocha_sprinkles = require("mocha-sprinkles");
let path = require("path");
let Promise = require("bluebird");
let shell = require("shelljs");
let should = require("should");
let touch = require("touch");
let util = require("util");

require("source-map-support").install();

let future = mocha_sprinkles.future;
let withTempFolder = mocha_sprinkles.withTempFolder;

let FileWatcher = require("../../lib/globwatcher/filewatcher").FileWatcher;

function makeFixtures(folder) {
  let past = Date.now() - 1000;
  [
    `${folder}/one.x`,
    `${folder}/sub/one.x`,
    `${folder}/sub/two.x`,
    `${folder}/nested/three.x`,
    `${folder}/nested/weird.jpg`
  ].map((file) => {
    shell.mkdir("-p", path.dirname(file));
    touch.sync(file, { mtime: past });
  });
}

function fixtures(f) {
  return future(withTempFolder((folder) => {
    makeFixtures(folder);
    return f(folder);
  }));
}

function withFileWatcher(f) {
  return (...x) => {
    let watcher = new FileWatcher();
    return f(watcher, ...x).finally(() => watcher.close());
  };
}


describe("FileWatcher", () => {
  it("creates a watch", fixtures(withFileWatcher((watcher, folder) => {
    (watcher.timer == null).should.eql(true);
    let watch = watcher.watch(`${folder}/one.x`);
    (watch != null).should.eql(true);
    (watcher.timer != null).should.eql(true);
    return Promise.resolve();
  })));
  
  it("reuses the same watch for the same filename", fixtures(withFileWatcher((watcher, folder) => {
    let watch1 = watcher.watch(`${folder}/one.x`);
    let watch2 = watcher.watch(`${folder}/one.x`);
    watch1.should.equal(watch2);
    return Promise.resolve();
  })));
 
  it("notices a change", fixtures(withFileWatcher((watcher, folder) => {
    let watch = watcher.watch(`${folder}/one.x`);
    let count = 0;
    watch.on("changed", () => count += 1);
    touch.sync(`${folder}/one.x`);
    count.should.eql(0);
    return watch.check().then(() => {
      count.should.eql(1);
    });
  })));

  it("notices several changes at once", fixtures(withFileWatcher((watcher, folder) => {
    let countOne = 0;
    let countTwo = 0;
    watcher.watch(`${folder}/sub/one.x`).on("changed", () => countOne += 1);
    watcher.watch(`${folder}/sub/two.x`).on("changed", () => countTwo += 1);
    touch.sync(`${folder}/sub/one.x`);
    touch.sync(`${folder}/sub/two.x`);
    countOne.should.eql(0);
    countTwo.should.eql(0);
    return watcher.check().then(() => {
      countOne.should.eql(1);
      countTwo.should.eql(1);
    });
  })));

  it("notices changes on a timer", fixtures(withFileWatcher((watcher, folder) => {
    let countOne = 0;
    let countTwo = 0;
    watcher.watch(`${folder}/sub/one.x`).on("changed", () => countOne += 1);
    watcher.watch(`${folder}/sub/two.x`).on("changed", () => countTwo += 1);
    touch.sync(`${folder}/sub/one.x`);
    touch.sync(`${folder}/sub/two.x`);
    countOne.should.eql(0);
    countTwo.should.eql(0);
    return Promise.delay(watcher.period + 10).then(() => {
      countOne.should.eql(1);
      countTwo.should.eql(1);
    });
  })));

  it("queues stacked check() calls", fixtures(withFileWatcher((watcher, folder) => {
    let count = 0;
    watcher.watch(`${folder}/one.x`).on("changed", () => count += 1);
    touch.sync(`${folder}/one.x`, { mtime: Date.now() + 1000 });
    let visited = [ false, false ];
    let x1 = watcher.check().then(() => {
      count.should.eql(1);
      touch.sync(`${folder}/one.x`, { mtime: Date.now() + 2000 });
      visited[1].should.eql(false);
      visited[0] = true;
    });
    let x2 = watcher.check().then(() => {
      visited[0].should.eql(true);
      visited[1] = true;
      count.should.eql(2);
    });
    visited[0].should.eql(false);
    visited[1].should.eql(false);
    return Promise.all([ x1, x2 ]);
  })));

  it("detects size changes", future(withTempFolder(withFileWatcher((watcher, folder) => {
    let now = Date.now() - 15000;
    let write = (data) => {
      fs.writeFileSync(`${folder}/shifty.x`, data);
      touch.sync(`${folder}/shifty.x`, { mtime: now });
    };
    write("abcdefghij");
    let count = 0;
    watcher.watch(`${folder}/shifty.x`).on("changed", () => count += 1);
    write("klmnopqrst");
    return watcher.check().then(() => {
      count.should.eql(0);
      write("abcdef");
      return watcher.check();
    }).then(() => {
      count.should.eql(1);
    });
  }))));

  it("can unwatch", future(withTempFolder(withFileWatcher((watcher, folder) => {
    touch.sync(`${folder}/changes.x`, { mtime: Date.now() - 15000 });
    let watch = watcher.watch(`${folder}/changes.x`);
    let count = 0;
    watch.on("changed", () => count += 1);
    touch.sync(`${folder}/changes.x`, { mtime: Date.now() - 11000 });
    return watcher.check().then(() => {
      count.should.eql(1);
      watcher.unwatch(`${folder}/changes.x`);
      touch.sync(`${folder}/changes.x`, { mtime: Date.now() - 6000 });
      return watcher.check();
    }).then(() => {
      count.should.eql(1);
    });
  }))));
});
