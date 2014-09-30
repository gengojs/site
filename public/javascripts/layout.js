$(document).ready(function() {

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-54542730-1', 'auto');
    ga('send', 'pageview');

    //calculate the time before calling the function in window.onload
    var beforeload = (new Date()).getTime();

    function getPageLoadTime() {
        //calculate the current time in afterload
        var afterload = (new Date()).getTime();
        // now use the beforeload and afterload to calculate the seconds
        seconds = (afterload - beforeload) / 1000;
        // Place the seconds in the innerHTML to show the results
        console.log('Page load time :' + seconds + ' sec(s).');
    }

    window.onload = getPageLoadTime;

    Prism.languages.jade = {
        'comment': [{
            pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
            lookbehind: true
        }, {
            pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
            lookbehind: true
        }],
        'keyword': /(\b(extends|block|h1|h2|h3|h4|h5|h6|p|script|button)\b)/g,
        'string': /(?:("|')([^\n\\\1]|\\.|\\\r*\n)*?\1)|("([^\n\\"]|\\.|\\\r*\n)*?")/g,
        'interpolate': {
            pattern: /\b(?:#{.*})\b/g,
            lookbehind: true

        }
    };
});
