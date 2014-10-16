/*jslint node: true*/
/*
Translation by: iwatakeshi
Improved by:
*/

module.exports = {
  "index": {
    "featurette": {
      "heading": {
        "one": {
          "default": "First step to Uberness.",
          "textmuted": "Initialize"
        },
        "two": {
          "default": "Second step to Gengoify.",
          "textmuted": "Templates"
        },
        "three": {
          "default": "Final step to Gengo.",
          "textmuted": "Dictionaries"
        },
        "four": {
          "default": "And a little bit of Extra.",
          "textmuted": "Moment.js and Numeral.js"
        }
      },
      "paragraph": {
        "one": {
          "default": "Gengo.js makes it easy to initialize and translate your pages with 3 simple steps:",
          "break": "Set. Configure. Initialize.",
          "textmuted": "Note that configuring gengo is optional, see Docs."
        },
        "two": {
          "default": [
            "It's uber easy to use gengo in your template of choice.",
            "Since gengo is a global variable, it's as easy as calling it with a simple syntax."
          ],
          "textmuted": "Note that only Jade has been tested but it should work with others."
        },
        "three": {
          "default": [
            "This step is uber easy to setup your dictionaries.",
            "There are two options when setting up your dictionaries:"
          ],
          "list": {
            "one": "Have gengo directly access your definitions.",
            "two": "Have gengo access your definitions by route."
          }
        },
        "four": {
          "default": "Love using these libraries? Rest assured, both are built into gengo and are easily accessible."
        }
      },
      "code": {
        "liveoutput": "live output:",
        "one": {
          "get": "Get an instance of gengo",
          "config": {
            "default": "Configure gengo",
            "folder": "Your locale folder"
          },
          "init": "Initialize gengo"
        },
        "two": {
          "simplesyntax": "Simple sytnax to use gengo: '__'",
          "output": "Welcome to Gengo.js"
        },
        "three": {
          "simple": "Really simple, gengo will just get what you have",
          "router": "router: true"
        },
        "four": {
          "date": "Today is %s.",
          "money": "I don\'t have %s."
        }
      }
    }
  },
  "gengo": {
    "navbar": {
      "home": "Home",
      "docs": "Docs",
      "english": "English",
      "search": "Search Language",
      "github": "Fork on Github"
    },
    "footer": {
      "twitter": [
        "Gengo.js is an [MIT](https://github.com/iwatakeshi/gengojs/blob/master/LICENSE)[blank] licensed ",
        "open source project by [@iwatakeshi](@iwatakeshi)[blank]."
      ],
      "backtotop": "Back to top"
    }
  },
  "docs": {
    "v0.2": {
      //do nothing
    },
    "sidenavbar": {
      "docs": "Docs",
      "reference": "Reference",
      "functions": "Functions",
      "translate": "Translate",
      "dictionary": "Dictionary",
      "momnum": "Moment and Numeral",
      "cookies": "Cookies",
      "markdown": "Markdown",
      "mustache": "Mustache"
    },
    "container": {
      "header": {
        "docs": "Docs"
      }
    },
    "reference": {
      "heading": {
        "notation": "Notations"
      },
      "paragraph": {
        //added!
        "api": {
          "note": "**Note that mathematical notations such as *iff*, *x*, *n*, etc, will be used throughout docs.**"
        },
        //changed!
        "input": {
          "return": "*Returns* **String** or **undefined**",
          "description": [
            "While the setup is uber simple, there are a couple of ways to setup your dictionary.",
            "Gengo will do its best to find the translated definition for the requested locale.",
            "If it does not find it, gengo will return the **phrase** or it will return **undefined** if",
            "it's in bracket, bracket-dot, or dot notation. Also, note that if a requested locale is your default locale,",
            "it will not translate but return the phrase iff the phrase notation or the bracket notation with phrase is used."
          ],
          "object": "*Object:* **phrase, locale, count** (String, Number)",
          "example": [
            "When using objects, you may override the locale by passing a string value with a locale.",
            "You may also let gengo know that a plural version of the phrase exists by passing a string or a number value."
          ],
          "notation": [
            "The accepted notations are **phrases**, **brackets**, **bracket-phrase** **bracket-dots**, and **dots**.",
            "Brackets, in itself, accepts **phrases** (bracket-phrase), and **dots** (bracket-dot). There may be cases where a key in your dictionary",
            "is a phrase and that phrase has a subkey such as **plural** and/or **x** (an arbitrary subkey). You can also have",
            "a dotted key such as **navbar.home** that may or may not contain subkeys. Unlike the dotted key, you may use the dot",
            "notation to access keys and subkeys. Because gengo allows you to access the definitions in plethora of ways, the nature",
            "of setting up your dictionary will be explained in [dictionary](#dictionary)."
          ]
        },
        //changed!
        "arg": {
          "default": [
            "When **n** = 1, gengo will assume that you will provide either a **locale** (String), **sprintf** ^[1] (String, Number, Array),",
            "**count** (String, Number), or an **Object** ^[2] that may or may not contain **sprintf**,",
            "**mustache** ^[3], **count**, and **locale**. If **n** > 1, gengo will consider ^[4] the arguments as sprintf."
          ],
          "footnote": {
            "one": "^[1] If your phrase contains *%*, gengo will consider it as sprintf syntax and will try to do its conversion.",
            "two": [
              "^[2] The keywords used in Object notation are **sprintf**, **locale**, and **count**.",
              "Anything else will be considered mustache syntax."
            ],
            "three": "^[3] If your phrase contains *{{...}}*, gengo will consider it as a mustache syntax and will try to render it.",
            "four": "^[4] It's possible to have an Object along with **n** number of strings and/or numbers, but I would recommend using the **sprintf** key with an array."
          }
        },
        "gengo": "Changes the global variable of gengo.",
        "moment": "Changes the global moment variable of gengo.",
        "numeral": "Changes the global numeral variable of gengo.",
        "directory": "The path to the locale files.",
        "debug": "Outputs the debugging statements. Available types are **info**, **warn**, **error**, **debug**, and **data**.",
        "supported": "The supported locales in your app.",
        "keywords": {
          "default": [
            "Changes the variable names used for plural, default, translated, and universe.",
            "Gengo will automatically look for these keywords, but they can be specified with dot notation."
          ],
          "list": {
            "one": "**default** is used when you use bracket-dot or dot notation in your default locale's dictionary.",
            "two": "**translated** is used when you use bracket-dot or dot notation in the translated locale's dictionary.",
            "three": "**plural** is used for plurality.",
            "four": "**universe** is used when you want certain definitions to be on all routes when router is enabled."
          }
        },
        "cookiename": "Changes the variable name used for cookies.",
        "def": [
          "The default language used in your template. This means you can write in your",
          " native language and gengo will translate it."
        ],
        "router": "Sets the routes for your definitions.",
        "language": "Returns the current language as a string.",
        "locale": {
          "set": "Sets the global locale.",
          "get": "Returns the global locale as a string."
        },
        "extension": "Sets the locale's file extension."
      },
      "def": "Default is:",
      "glyphicon": {
        "supported": [
          "gengo is strict concerning comparisons. ",
          "If your default does contain similar languages, then please provide them."
        ]
      },
      "code": {
        "notation": {
          "phrase": "phrase",
          "bracket": "bracket",
          "brackdot": "bracket-dot",
          "dot": "dot"
        }
      }
    },
    "dictionary": {
      "heading": {
        "dictionary": "Dictionary",
        "kawari": [
          "What makes gengo great is its built in [Kawari.js](https://www.github.com/iwatakeshi/kawarijs)[blank] support. ",
          "You can replace strings with a simple syntax."
        ],
        "markdown": "Markdown",
        "momnum": "Moment and Numeral",
        "cookies": "Cookies",
        "mustache": "Mustache",
      },
      "paragraph": {
        "setup": {
          "default": [
            "While the setup is uber simple, there are a couple of ways to setup your dictionary. Keep in mind",
            "that gengo uses the web brower's **Accept-Language** header and looks up for the dictionary by the requested locale.",
            "Also note that .json and .js file supported file extension.",
            "When you are translating your default langauge, it is optional to have a dictionary",
            "for the default iff you are using phrase notation (including bracket-phrase) for the entire site since gengo will",
            "just return the original phrase when the requested locale is the default language."
          ],
          "continued": [
            "When you do use a special notation, you should ^[1] provide a **default** keyword and a **translated** keyword to your definition.",
            "Therefore, the default keyword and the translated keyword are used to tell gengo that a default and translated phrase exists under",
            "a special notation. Gengo will automatically look for the keywords but they can be specified using dot notation as well."
          ],
          "footnote": {
            "one": [
              "^[1] If you do not provide the keywords, gengo will do its best to figure out whether the key is a string.",
              "If so, it will return the **string**. If it can't find any value, it will return <i>undefined</i>."
            ]
          },
          "problem": {
            "default": "Problems may arise when you have multiple lines in your definition like so:",
            "continued": [
              "How does gengo deal with multiple lines? Surely you don't want to have a long line",
              "of a sentence with new lines in your definition. The answer to this problem is arrays.",
              "You can use arrays in your dictionary and gengo will append a new line for you like so:"
            ]
          },
          "universe": {
            "default": [
              "Gengo's goal is to organize your definitions. It is the reason why different notations exist so that for different circumstances",
              "you can use either notation. Speaking of organization, let's talk about router. Router is a feature to seperate your definitions",
              "for specific routes. An example can be found in [router](#router-bool), but specifically let's talk about **universe**.",
              "Universe ^[1] is a special key used in your dictionaries to let gengo know that any key/pair contained under universe can be",
              "accessed throughout the routes. Meaning that whether the requested page is <i>index/some/page</i>, gengo will look into universe and",
              "find the perfect match for the desired phrase if the phrase is not in that page.",
              "This is extremely useful when you have phrases that repetitively appear on every route."
            ],
            "footnote": {
              "one": "^[1] The default keyword is **gengo**. See [keywords](#keywords)."
            }
          },
          "conclusion": [
            "Ultimately, the setup of your dictionary depends on how you want to organize and access your definition.",
            "Router is disabled by default since it is the safest way to retrieve your definitions,",
            "but the cost is great with organization. Router is fairly a new feature but it's powerful for organization.",
            "Given a fair amount of tools, the question will ultimately be, how will you gengo?"
          ]
        },
        "momnum": [
          "Another great feature is the use of [Moment.js](http://www.momentjs.com)[blank] ",
          "and [Numeral.js](http://www.numeraljs.com)[blank]. Since they are both built into gengo, ",
          "you can use it without worrying about changing its locale and language. "
        ],
        "cookies": "At the moment, the only way to change a language with a browser is by cookies. But, the setup is pretty easy.",
        "markdown": {
          "default": "With gengo, you can insert *custom* ~~**Markdown**~~ and [translate](#dictionary) it.",
          "supported": {
            "default": "For standard links the following are supported:",
          }
        },
        "mustache": "gengo now supports mustache syntax. This means you can insert phrases using objects."
      },
      "code": {
        "cookies": {
          "set": "set the cookie",
          "reset": "reset the cookie",
          "refresh": "refresh the page"
        },
        "markdown": {
          "caution": "notice the !="
        }
      }
    },
  }
};
