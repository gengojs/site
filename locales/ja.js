/*jslint node: true*/
/*
Translation by: iwatakeshi
Improved by:
*/

module.exports = {
  "index": {
    "Install": "インストール",
    "Learn more": "もっと知る",
    "An uber basic and simple i18n library for Express 4": "チョウ基本的で簡単なi18nノードエクスプレス４ライブラリ。",
    "featurette": {
      "heading": {
        "one": {
          "translated": "チョウへのファーストステップ。",
          "textmuted": "イニシャライズ"
        },
        "two": {
          "translated": "ゲンゴエファイへのセカンドステップ。",
          "textmuted": "テンプレーツ"
        },
        "three": {
          "translated": "ゲンゴへのファイナルステップ。",
          "textmuted": "辞書"
        },
        "four": {
          "translated": "最後に。",
          "textmuted": "Moment.jsとNumeral.js"
        }
      },
      "paragraph": {
        "one": {
          "translated": "たったの3ステップでGengo.jsがあなたのウェブページを一瞬に変換してくれます：",
          "break": "セット。コンフィグ。イニシャライズ。",
          "textmuted": "コンフィグの設定は任意ですがドクスのページを見てください。"
        },
        "two": {
          "translated": [
            "gengoをあなたの好きなテンプレートで使うのはチョウかんたんです。",
            "gengoの存在はグローバルなのでシンプルなシンタックスで使えます。"
          ].join('\n'),
          "textmuted": "ジェードしかテストされていませんが他のテンプレートにでも使えるはずです。"
        },
        "three": {
          "translated": [
            "辞書のセットアップはチョウ簡単です。",
            "辞書のセットアップには二つの選択が有ります。"
          ].join('\n'),
          "list": {
            "one": "gengoをつかって辞書に直接アクセスする。",
            "two": "gengoをルートで辞書にアクセスする。"
          }
        },
        "four": {
          "translated": "このライブラリお好きですか?安心してください。二つともgengoに組み込まれています。"
        }
      },
      "code": {
        "liveoutput": "ライブアウトプット：",
        "one": {
          "get": "インスタンスを取得する。",
          "config": {
            "translated": "コンフィグ",
            "folder": "ローカルのパス"
          },
          "init": "イニシャライズ"
        },
        "two": {
          "simplesyntax": "シンプルなシンタックスでgengoを使える。\'__\'",
          "liveoutput": "ライブアウトプット：",
          "output": "Gengo.jsへようこそ"
        },
        "three": {
          "simple": "ほんとに簡単。gengoがただあなたの持っている辞書にアクセスする。",
          "router": "router: true"
        },
        "four": {
          "date": "今日は%sです。",
          "money": "私は%sを持っていません。"
        }
      }
    }
  },
  "gengo": {
    "navbar": {
      "home": "ホーム",
      "docs": "ドクス",
      "japanese": "日本語",
      "search": "言語を検索",
      "github": "GitHubでフォーク",
      "banner": "チョウ基本的で簡単なi18nノードエクスプレス４ライブラリ。",
    },
    "footer": {
      "twitter": [
        "Gengo.jsは[@iwatakeshi](@iwatakeshi)による",
        "[MIT](https://github.com/iwatakeshi/gengojs/blob/master/LICENSE)ライセンスのオーぺんソースプロジェクトです。"
      ].join('\n'),
      "backtotop": "トップへ戻る",
    }
  },
  "docs": {
    "v0.2": {
      "An uber basic and simple i18n library for Express 4": "チョウ基本的で簡単なi18nノードエクスプレス４ライブラリ。",
      "Get an instance of gengo": "インスタンスを取得する。",
      "Configure gengo": "コンフィグ",
      "Initialize gengo": "イニシャライズ",
      "The path to your locales": "ローカルのパス",
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
      "docs": "ドクス",
      "reference": "リファレンス",
      "functions": "ファンクションズ",
      "translate": "翻訳",
      "dictionary": "辞書",
      "momnum": "MomentとNumeral",
      "cookies": "クッキー",
      "markdown": "マークダウン",
      "mustache": "Mustache"
    },
    "container": {
      "header": {
        "docs": "ドクス"
      }
    },
    "dictionary": {
      "heading": {
        "dictionary": "辞書",
        "kawari": [
          "gengoの凄さは[Kawari.js](https://www.github.com/iwatakeshi/kawarijs)[blank]のサポートに有ります。",
          "gengoはKawari.jsが持っているもののだけ複数の引数の例外への大部分をサポートしています。"
        ].join('\n'),
        "markdown": "マークダウン",
        "momnum": "MomentとNumeral",
        "cookies": "クッキー",
        "mustache": "Mustache",
      },
      "paragraph": {
        "setup": "辞書のセットアップは非常に簡単です。デフォルトでは、gengo同時に、JSONを使用しています。",
        "momnum": [
          "もう一つの大きな機能は、 [Moment.js](http://www.momentjs.com)[blank]と[Numeral.js](http://www.numeraljs.com)[blank]の使用である。彼らは両方gengoに組み込まれているので、",
          "あなたはそのロケールと言語を変更することを気にせずに使用することができます。"
        ].join('\n'),
        "cookies": "現時点では、ブラウザで言語を変更する唯一の方法は、クッキーによるものである。しかし、セットアップは非常に簡単です。",
        "markdown": "gengoを使用すると、マークダウンを挿入し、それを翻訳することができます。",
        "mustache": "gengoは現在、Mustacheのシンタックスをサポートします。これは、オブジェクトを使用してフレーズを挿入できることを意味します。"
      },
      "code": {
        "cookies": {
          "set": "クッキーをセットする",
          "reset": "クッキーをリセットする",
          "refresh": "ページを更新する"
        },
        "markdown": {
          "caution": "!= にご注意ください"
        }
      }
    },
    "reference": {
      "heading": {
        "notation": "記法"
      },
      "paragraph": {
        "input": "翻訳する単語や文章。",
        "arg": "交換する単語。",
        "gengo": "gengoのグローバル変数を変更します。",
        "moment": "momentのグローバル変数を変更します。",
        "numeral": "numeralのグローバル変数を変更します。",
        "directory": "ロケールファイルへのパス。",
        "debug": "デバッグの情報を出力します。",
        "supported": "あなたのアプリでサポートされるロケール。",
        "keywords": "plural, default, translatedとuniverseに使用する変数名を変更します。",
        "cookiename": "クッキーに使用する変数名を変更します。",
        "def": [
          "テンプレートで使用されるデフォルトの言語。これは、あなたの母国語で書くことができますし、",
          "gengoがそれを翻訳すると言うことを意味します。"
        ].join('\n'),
        "router": "あなたの定義をルートに整理します。",
        "language": "文字列として現在の言語を返します。",
        "locale": {
          "set": "グローバルロケールを設定します。",
          "get": "文字列としてグローバルなロケールを返します。"
        },
        "extension": "ロケールファイルの拡張子を設定します。"
      },
      "def": "デフォルトは：",
      "glyphicon": {
        "supported": "gengoは比較に関しては厳格です。あなたのデフォルトに同じような言語が含まれていない場合は、それらを提供してください。"
      },
      "code": {
        "notation": {
          "phrase": "フレーズ",
          "bracket": "ブラケット",
          "brackdot": "ブラケットドット",
          "dot": "ドット"
        }
      }
    }

  }
};
