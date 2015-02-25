Gadzooks!
=========
A miscellany of adornments, accoutrements and other such trappings to the popular [Fallen London](http://fallenlondon.storynexus.com) browser game.

Gadzooks! is in no way associated with Failbetter games and provides absolutely no support for its use

Here be dragons, and so forth.


How to use
----------
1. Drag the bellow bookmarklet to your bookmarks.
2. Open the [Fallen London](http://fallenlondon.storynexus.com) website
3. Open the bookmarklet
4. Configure Gadzooks! to your hearts content. By default a new tab should be created allowing access to the Gadzooks! options screen or you can press F12.


**Bookmarklet**

Create a bookmark with the following URL: 

```
javascript:$('body').append('<script src="http://gadzooks.ap01.aws.af.cm/inject.js"></script>')
```



What Gadzooks! Does
-------------------
Gadzooks! provides a series of browser injections in a manageable, modular way.
It was originally written because I feel that the lack of mobile support for Fallen London is severely lacking and could be rectified. However some of the changes I made might not be to everyones liking so I started to split them up into optional modules.

Gadzooks! has a number of supported 'Zooks' which can provide functionality anywhere from CSS fixes to full JavaScript patching.


FAQ
---
**Does Gadzooks! work on mobile devices?**

Absolutely. Use the same technique to load Gadzooks! via a bookmarklet and you get a fancy almost-an-app experience.


**Is there any support for Gadzooks?**

In a way yes. If you have noticed an error please [create a ticket](https://github.com/hash-bang/gadzooks/issues) on the Gadzooks! GitHub page. **DO NOT** bother Failbetter games about this. We are in no way affiliated with the original creators of FL and them receiving complaints about our module will probably end up in someone getting mad.


**Why 'Gadzooks'?**

Its a shortened version of 'Gods Hooks' (the nails from the crucifixion). Since it hooks into an existing game the pun was too much to resist.


**Can I cheat using Gadzooks?**

No. FL is *mostly* server based. Its not possible to alter the state of your character, inventory or anything like that without going though the server.


**I have a great idea for a new Zook (a plugin)**

Thats great! File it in the [ticket tracker](https://github.com/hash-bang/gadzooks/issues) as a suggestion and we'll see what we can do.

You may also wish to check out the [zook tips](zooks.md) for some tips on writing Zooks.


**I have some programming ability and wish to help**

Again, great. Either fork the [original repo](https://github.com/hash-bang/gadzooks) and [create a pull request](https://help.github.com/articles/creating-a-pull-request) for whatever you come up with so everyone can benefit.


**Does Gadzooks! do anything perminant?**

No. Gadzooks! is a *temporary* set of tools that gets injected into the web page only when you request it. A simple page refresh will put everything back to normal.


**Does Gadzooks! do anything bad?**

The only major thing Gadzooks! could be said to do that could be considered 'bad' is that it disables the help system for FL. We do this so people do not bother Failbetter with complaints which may be the fault of Gadzooks!


**Who are you?**
My name is [Matt Carter](https://github.com/hash-bang) and I'm a senior developer at [Mom's Friendly Development Company](http://mfdc.biz).

Within FL I go by the username `Cac0nym`.
