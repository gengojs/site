var Locale = function() {
    return {
        set: function(locale) {
            //set the cookie
            $.cookie("locale", locale);
            //refresh the page
            location.reload();
        },
        reset: function() {
            //reset the cookie
            $.cookie("locale", null);
            //refresh the page
            location.reload();
        }
    };
};

$(document).ready(function() {
    console.log($.cookie("locale"));

    var languageArray = [
        'English US',
        'Japanese'
    ];

    var languages = {
        "English US": "en_US",
        "Japanese": "ja"
    };

    $('.language').typeahead({
        source: languageArray,
        autoSelect: true,
    });

    $('.language').keypress(function(event) {
        if (event.keyCode === 13) {
            var selected = this.value;
            Locale().set(languages[selected]);
        }
    });

    $('form').submit(function(event) {
        event.preventDefault();
    });
});
