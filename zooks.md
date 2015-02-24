Programming Zooks
=================

Structure
---------
In its base form a Zook is simply a HTML file which can contain CSS, JavaScript and HTML. When a Zook gets loaded it is injected as the last element in the `<body>`.

The structure of a zook also requires a package definition which is specified within a `<script type="application/zook">` container.

```json
{
	"forced": false, // If true the zook is always enabled and cannot be disabled
	"hide": true, // If true this zook wont be shown in the options page
	"default": false, // The default state of the zook
	"title": "Simple Gadzook package", // A short descriptive title
	"description": "This Zook does nothing at all except turn the background color red. Its designed for developers and other such deviants"
}
```

The best source for learning how a zook works is exploring the [available zooks](zooks).


Tips
----

Things to remember:

* The main site uses jQuery 1.3.1 so you can't use any of the modern jQ stuff like 'on', 'one' etc. You are limited to [whats available in jQ 1.3.1](http://api.jquery.com/category/version/1.3)
	* `on()` is not available use `live()` instead
	* `elem.find()` is not available, use `elem.children()`
