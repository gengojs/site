gengojs-cookie-locale
=====================

A front end cookie locale setter for those who use gengojs

This library requires:

* JQuery
* jquery-cookie

###Usage

```html

<ul>
	<li><a href="###" class="en-us">English</a></li>
	<li><a href="###" class="ja">Japanese</a></li>
</ul>


<script type='text/javascript' src='jquery.min.js'>
</script>
<script type="text/javascript" src="jquery-cookie.js"></script>
<script type="text/javascript" src="gcl.min.js"></script>
<script type="text/javascript">
	$(document).ready(function () {
		var gengo = gcl();
		$('.en-us, .ja').click(function () {
			gengo.setLocale(this);
		})
	});

</script>

```

###API

|Method   |Description   |Return   |
|---------|--------------|---------|
|setLocale|Sets the cookie by either the class name from jquery's `this` object or the locale's string|   |

###Option

|Option   |Description|
|---------|-----------|
|cookieName| Sets the name of the cookie

Example:

```js
var gengo = new gcl({cookiName:'ihearti18n'});
```