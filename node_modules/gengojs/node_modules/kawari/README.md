kawarijs
========

A simple sprintf library for Node.js and the browser.

Majority of the code is from http://www.webtoolkit.info/javascript-sprintf.html

###From the site:

Several programming languages implement a sprintf function, to output a formatted string. It originated from the C programming language, printf function. Its a string manipulation function.

This is limited sprintf Javascript implementation. Function returns a string formatted by the usual printf conventions. See below for more details. You must specify the string and how to format the variables in it. Possible format values:

* %% – Returns a percent sign
* %b – Binary number
* %c – The character according to the ASCII value
* %d – Signed decimal number
* %f – Floating-point number
* %o – Octal number
* %s – String
* %x – Hexadecimal number (lowercase letters)
* %X – Hexadecimal number (uppercase letters)

Additional format values. These are placed between the % and the letter (example %.2f):

* \+ (Forces both + and – in front of numbers. By default, only negative numbers are marked)
* – (Left-justifies the variable value)
* 0 zero will be used for padding the results to the right string size
* \[0-9] (Specifies the minimum width held of to the variable value)
* .\[0-9] (Specifies the number of decimal digits or maximum string length)

If you plan using UTF-8 encoding in your project don’t forget to set the page encoding to UTF-8 (Content-Type meta tag), and use Javascript UTF-8 utility found on this website.

###TODO
* Tests