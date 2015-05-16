Programming Zooks
=================

Debugging / Creating Zooks 101
------------------------------
1. Setup a server on your own machine so that [http://localhost](http://localhost) resolves to the Gadzooks! directory.
2. Disable Greasemonkey, Tampermonkey or whatever injector you may already be using
3. Create the following bookmarklet: `javascript:$('body').append('<script src="http://localhost/inject-debug.js"></script>')`
4. Visit the [Fallen London](http://fallenlondon.storynexus.com) website
5. Open the debug bookmarklet. This should load Gadzooks! from your local machine and not from the main site.

The above instructions loads the [inject-debug.js](inject-debug.js) instead of the regular [inject.js](inject.js) injector. This forces the Gadzooks! core to load all resources from [http://localhost](http://localhost) rather than the live site. You should now be able to edit files and test them in real time by repeating steps 4 + 5, above.


Structure
---------
In its base form a Zook is simply a HTML file which can contain CSS, JavaScript and HTML. When a Zook gets loaded it is injected as the last element in the `<body>`.

The structure of a zook requires a package definition which is specified within a `<script type="application/zook">` HTML tag container.

```json
<script type="application/zook">
{
	"forced": false, // If true the zook is always enabled and cannot be disabled
	"hide": true, // If true this zook wont be shown in the options page
	"default": false, // The default state of the zook
	"title": "Simple Gadzook package", // A short descriptive title
	"description": "This Zook does nothing at all except turn the background color red. Its designed for developers and other such deviants"
}
</script>
// Anything else such as CSS, JavaScript or HTML resources goes here in regular 'style', 'script' or inline HTML tags
```

The best source for learning how a zook works is exploring the [available zooks](zooks) specifically the [test zook](zooks/test.html).


Tips
----

Things to remember:

* The main site uses jQuery 1.3.1 so support for 'modern jQ' APIs like 'on', 'one' is buggy. You are currently limited to [whats available in jQ 1.3.1](http://api.jquery.com/category/version/1.3) until the site version of jQuery gets updated.
	* `on()` is not available to monitor all items on a page. Use `live()` instead
	* `elem.find()` is not available, use `elem.children()` to filter an items child elements
