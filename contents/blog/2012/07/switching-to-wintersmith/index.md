---
title: Switching to Wintersmith
author: Alex Normand
description: Switching to Wintersmith
date: 2012-07-15 22:42
template: article.jade
---

I've decided to Switch this site to another static site generator:
[Wintermith](http://jnordberg.github.com/wintersmith/).
I won't go over the [reasons](http://mickgardner.com/2011/04/27/An-Introduction-To-Static-Site-Generators.html)
[why](http://news.ycombinator.com/item?id=896634) static site generators are awesome (or [harmful](http://www.jeremyscheff.com/2011/08/jekyll-and-other-static-site-generators-are-currently-harmful-to-the-free-open-source-software-movement/)) for simple websites and blogs.
This site used to be powered by [Hyde](https://github.com/hyde/hyde/), an SSG written in python.
This post will describe the reasons why I decided to drop Hyde in favour of Wintersmith.

<span class="more"></span>


Introduction
-------------
Static site generators have become quite popular recently.
While there aren't any official figures to my knowledge, I believe [Jekyll](http://jekyllrb.com/) is the most
popular static site generator (SSG) and powers [Github pages](http://pages.github.com/).

Despite this, I chose Jekyll's evil twin [Hyde](https://github.com/hyde/hyde/) which looked like an elegant and cool alternative.
At first Hyde was quite easy to use and play around with for a newcomer like myself.
However, one of Hyde's biggest drawback was (and still is) its documentation.
As a result finding information was quite hard, and I mainly built the first
version of this site by looking at other Hyde powered sites, namely
http://michealgrosner.com and http://vincent.bernat.im.

I also experienced weird behaviours, quirks & bugs between versions, and
Hyde seemed overly complicated to me.


Wintersmith
-----------

I started looking for simpler alternatives and was pleasantly surprised to find out that there
were [several](http://blog.bmannconsulting.com/node-static-site-generators/) node.js based SSGs.
I decided to try [Wintersmith](http://jnordberg.github.com/wintersmith/).
Here are my favorite Wintersmith features:

 * Small and simple code base.
 * [Jade](http://jade-lang.com/) templates
 * Nice plugin system (I use the stylus plugin)
 * [Underscore.js](http://underscorejs.org/) which is great when working with templates.


As a Web developer and JavaScript being my primary programming language,
I really liked Wintersmith's bundled features, and was able to effortlessly
port my Hyde-based site to Wintersmith.

Wintersmith is very easy to install:
```
$ npm install wintersmith -g
```

To create a new site:
```sh
$ wintersmith new <path>
```

this will create the basic structure for your site:

   * a **contents** folder: this folder contains all of your assets (images, css and js files) and your content written
     in markdown or json files.
   * a **templates** folder: this folder contains all of your templates used to render your content.
   * a **config.json** file: this file is your main config file, where you put any global options, here is mine:


```
{
   "locals": {
        "mode": "prod",
        "url": "http://www.alexnormand.com",
        "name": "Alex Normand",
        "owner": "Alex Normand",
        "description": "Alex Normand",
        "index_articles": 3,
        "menu" : [
             {
               "name": "Home",
               "description": "Home Page",
               "url": "/"
              },
              {
               "name": "Github",
               "description": "My Gihub profile",
               "url": "https://github.com/alexnormand"
              },
              {
               "name": "Blog",
               "description": "Blog",
               "url": "/blog"
              },
              {
               "name": "About",
               "description": "About ",
               "url": "/about"
              }
        ]
     },
     "plugins": [
         "wintersmith-stylus/"
     ]
}
```


And finally when you're done editing your templates and customizing your site:
```
$ wintersmith build
```

this will generate a static version of your site in a **build** folder
ready to be uploaded to any web server.

Wintermsith is a promising project and is being actively developed by [Johan Nordberg](http://johan-nordberg.com/).
It is a flexible, fast and easy to use static site generator and I highly recommend it.

At the time of writing, I haven't come across any other website powered by Wintersmith,
so feel free to [fork this site](https://github.com/alexnormand/alexnormand.com) on Github.






