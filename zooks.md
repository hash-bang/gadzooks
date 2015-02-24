Programming Zooks
=================

Things to remember:

* The main site uses jQuery 1.3.1 so you can't use any of the modern jQ stuff like 'on', 'one' etc. You are limited to [whats available in jQ 1.3.1](http://api.jquery.com/category/version/1.3)
	* `on()` is not available use `live()` instead
	* `elem.find()` is not availble, use `elem.children()`
