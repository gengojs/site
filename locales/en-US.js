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
          ].join('\n'),
          "textmuted": "Note that only Jade has been tested but it should work with others."
        },
        "three": {
          "default": [
            "This step is uber easy to setup your dictionaries.",
            "There are two options when setting up your dictionaries:"
          ].join('\n'),
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
      "github": "Fork on Github",
    },
    "footer": {
      "twitter": [
        "Gengo.js is an [MIT](https://github.com/iwatakeshi/gengojs/blob/master/LICENSE)[blank] licensed ",
        "open source project by [@iwatakeshi](@iwatakeshi)[blank]."
      ].join('\n'),
      "backtotop": "Back to top",
    }
  },
  "docs": {
    "v0.2": {
      "An uber basic and simple i18n library for Express 4": "チョウ基本的で簡単なi18nノードエクスプレス４ライブラリ。",
      "Docs": "ドクス",
      "Menu": "メニュー",
      "Initialize": "イニシャライズ",
      "gengo": 　"ゲンゴ",
      "Config": "コンフィグ",
      "Reference": "リファレンス",
      "Functions": "ファンクションズ",
      "Translate": "翻訳",
      "Dictionary": "辞書",
      "Moment and Numeral": "MomentとNumeral",
      "Cookies": "クッキー",
      "Default is:": "デフォルトは：",
      "Words or sentences to translate.": "翻訳する単語や文章。",
      "The words to replace with.": "交換する単語。",
      "Changes the global variable of gengo.": "gengoのグローバル変数を変更します。",
      "Changes the global variable of moment.": "momentのグローバル変数を変更します。",
      "The path to the locale files.": "ロケールファイルへのパス。",
      "Changes the global variable of numeral.": "numeralのグローバル変数を変更します。",
      "Outputs the debugging statements.": "デバッグの情報を出力します。",
      "The supported locales in your app.": "あなたのアプリでサポートされるロケール。",
      "gengo is strict concerning comparisons. If your default does contain similar languages, then please provide them.": "gengoは比較に関しては厳格です。あなたのデフォルトに同じような言語が含まれていない場合は、それらを提供してください。",
      "The default language used in your template. This means you can write in your native language and gengo will translate it.": "テンプレートで使用されるデフォルトの言語。これは、あなたの母国語で書くことができますし、gengoがそれを翻訳すると言うことを意味します。",
      "Returns the current language as a string.": "文字列として現在の言語を返します。",
      "Returns the current locale as a string.": "文字列として現在のロケールを返します。",
      "Organizes your definitions into routes.": "あなたの定義をルートに整理します。",
      "Sets the routes for your definitions": "あなたの定義をルートにを設定します。",
      "Another great feature is the use of Moment.js and Numeral.js. Since they are both built into gengo, you can use it without worrying about changing its locale and language. Also, if you do want to change the locale or language but still want to use gengo’s current language, then it is as easy as using the browser version of Moment.js and Numeral.js along with gengo’s Moment.js and Numeral.js.": "もう一つの大きな機能は、 Moment.jsとNumeral.jsの使用である。彼らは両方gengoに組み込まれているので、あなたはそのロケールと言語を変更することを気にせずに使用することができます。あなたはロケールや言語を変更したいが、まだgengoの現在の言語を使いたいん場合も、それはgengoのMoment.jsとNumeral.jsと一緒にMoment.jsとNumeral.jsのブラウザのバージョンを使用するのと同じくらい簡単です。",
      "At the moment, the only way to change a language with a browser is by cookies. But, the setup is pretty easy.": "現時点では、ブラウザで言語を変更する唯一の方法は、クッキーによるものである。しかし、セットアップは非常に簡単です。",
      "Setting up your dictionary is uber easy. By default, gengo uses XML and JSON simultaneously. Of course, XML is optional and will not affect gengo if you decide to only use JSON.": "辞書のセットアップは非常に簡単です。デフォルトでは、gengo同時に、XMLとJSONを使用しています。もちろん、XMLはオプションで、JSONだけ使用することに決めた場合gengoには影響しません。",
      "In XML, you can write longer sentences without using a newline.": "XMLでは、あなたは改行を使用せずに長い文章を書くことができます。",
      "Use repetative definitions across routes with routeAware enabled.": "反復的な定義をrouteAwareで全ルートに使用する。",
      "With gengo, you can insert HTML and translate it.": "gengoを使用すると、HTMLを挿入し、それを翻訳することができます。",
      "What makes gengo great is its built in Sprintf.js support. You can replace strings with a simple syntax. gengo supports majority of what the Sprintf.js has but only to the exception of multiple arguments.": "gengoの凄さはSprint.jsのサポートに有ります。gengoはSprintf.jsが持っているもののだけ複数の引数の例外への大部分をサポートしています。",
      "notice the !=": "!= にご注意ください",
      "set the cookie": "クッキーをセットする",
      "reset the cookie": "クッキーをリセットする",
      "refresh the page": "ページを更新する"
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
    "dictionary": {
      "heading": {
        "dictionary": "Dictionary",
        "kawari": [
          "What makes gengo great is its built in [Kawari.js](https://www.github.com/iwatakeshi/kawarijs)[blank] support. ",
          "You can replace strings with a simple syntax."
        ].join('\n'),
        "markdown": "Markdown",
        "momnum": "Moment and Numeral",
        "cookies": "Cookies",
        "mustache": "Mustache",
      },
      "paragraph": {
        "setup": "Setting up your dictionary is uber easy. By default, gengo uses JSON.",
        "momnum": [
          "Another great feature is the use of [Moment.js](http://www.momentjs.com)[blank] ",
          "and [Numeral.js](http://www.numeraljs.com)[blank]. Since they are both built into gengo, ",
          "you can use it without worrying about changing its locale and language. "
        ].join('\n'),
        "cookies": "At the moment, the only way to change a language with a browser is by cookies. But, the setup is pretty easy.",
        "markdown": "With gengo, you can insert *custom* ~~**Markdown**~~ and [translate](#dictionary) it.",
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
    "reference": {
      "heading": {
        "notation": "Notations"
      },
      "paragraph": {
        "input": "Phrases to translate.",
        "arg": "The words to replace with or settings to change.",
        "gengo": "Changes the global variable of gengo.",
        "moment": "Changes the global moment variable of gengo.",
        "numeral": "Changes the global numeral variable of gengo.",
        "directory": "The path to the locale files.",
        "debug": "Outputs the debugging statements.",
        "supported": "The supported locales in your app.",
        "keywords": "Changes the variable names used for plural, default, translated, and universe.",
        "cookiename": "Changes the variable name used for cookies.",
        "def": [
          "The default language used in your template. This means you can write in your",
          " native language and gengo will translate it."
        ].join('\n'),
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
        ].join('\n')
      },
      "code": {
        "notation": {
          "phrase": "phrase",
          "bracket": "bracket",
          "brackdot": "bracket-dot",
          "dot": "dot"
        }
      }
    }
  }
};
