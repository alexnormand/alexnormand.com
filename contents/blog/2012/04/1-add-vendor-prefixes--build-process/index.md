---
title:  Automatically Add Vendor Prefixes During Your Build Process
author: Alex Normand
description: Automatically Add Vendor Prefixes During Your Build Process using ant and prefixr
date: 2012-04-01 19:00
template: article.nunjucks
---

Several months ago, the CSS working group discussed the issue of the **-webkit** prefix monopoly and the fact
that developers usually don't bother adding other prefixes.
As a result, browser vendors considered using **-webkit** as the only vendor prefix and thus
dropping their own prefixes (ie: -moz, -o, -ms,...).
This suggestion caused an uproar [in](http://lea.verou.me/2012/02/vendor-prefixes-the-css-wg-and-me/)
the [web](http://www.glazman.org/weblog/dotclear/index.php?post/2011/11/16/CSS-vendor-prefixes-an-answer-to-Henri-Sivonen)
[community](http://remysharp.com/2012/02/09/vendor-prefixes-about-to-go-south/).

<span class="more"></span>


Currently, the most popular and preferred method to automatically handle vendor prefixes effortlessly is to work with CSS preprocessors
like [SASS](http://sass-lang.com/), [LESS](http://lesscss.org/) & [Stylus](http://learnboost.github.com/stylus/).
Yet many Developers don't bother using and/or learning these tools.
You should definitely consider using these tools as they will save you time and hassle.
Dealing with all [variants](http://peter.sh/experiments/vendor-prefixed-css-property-overview/)
of implemented CSS3 properties by hand can be a time-consuming, error-prone and repetitve task.


In this post, I'll show you how you can easily and automatically add missing vendor prefixes in you css files
during your build process using [ant](http://ant.apache.org/) (or [make](http://www.gnu.org/software/make/manual/make.html))
and [prefixr](http://prefixr.com/).
This will ensure that all prefixes are automatically included in your builds.


Our sample project
------------------

The sample project we'll be working with is available at
http://alexnormand.github.com/demos/2012/03/31/build/,
you can also check out the [source code](https://github.com/alexnormand/demos/tree/gh-pages/2012/03/31) if you wish.
This simple web page queries imdb using the [imdb api](http://www.imdbapi.com/) via a JSONP request.
The response is then simply printed on the web page. The CSS stylesheet uses several CSS3 properties such as
box-shadow, border-radius, gradients, transitions,...

<img src="http://farm8.staticflickr.com/7077/6890313350_4b2b2932e6.jpg" width="500" height="217" alt="alexnormand-demo-imdb-search-box-screenshot">
<img src="http://farm8.staticflickr.com/7085/6890313356_0e98c7ab0a.jpg" width="486" height="500" alt="alexnormand-demo-imdb-display-result-screenshot">


We'll use the [prefixr api](http://www.prefixr.com/api/usage/) on the command line to add any missing vendor-prefixed property:

```sh
$ curl -sSd css="$(cat path/to/style.css)" http://prefixr.com/api/index.php -o /path/to/output/style.css
```

<br />


Here's the simplified ant build file which passes the contents of the **style.css**
file to the css parameter and makes a POST request to http://prefixr.com/api/index.php

```
    <target>
        <!--Source CSS dir-->
        <property name="src.css.dir" value="${basedir}/css"/>
        <!-- Prefixr URL -->
        <property name="prefixr.url" value="http://prefixr.com/api/index.php" />
        <!--Output dir-->
        <property name="build.dir" value="../build"/>
    </target>

    <!-- Add missing vendor prefixes -->
    <target name="-prefixr"
            description="Adds missing vendor prefixes to css files" >
      <loadfile property="build.style.css" srcFile="${src.css.dir}/style.css" />
      <exec executable="curl" failonerror="true" output="${build.dir}/css/style.css">
         <arg line='-sSd css="${build.style.css}"  ${prefixr.url}'/>
      </exec>
      <echo>Added missing vendor prefixes to stylesheets</echo>
    </target>
</project>
```

Here's the makefile version:
```sh
.PHONY = all, clean, copy, gen

SRC   = src
BUILD = build
BUILD.STYLE.CSS = $(BUILD)/css/style.css
TOOLS = ~/tools

HTMLCOMPRESSOR = $(TOOLS)/htmlcompressor-1.5.2.jar
YUICOMPRESSOR  = $(TOOLS)/yuicompressor-2.4.7.jar
PREFIXR        = http://prefixr.com/api/index.php

all :  clean gen

clean:
        rm -rf $(BUILD)

copy:
        mkdir -p $(BUILD)/css
        cp $(SRC)/css/style.css $(BUILD)/css

gen: copy
        java -jar $(HTMLCOMPRESSOR) -o $(BUILD)/index.html --compress-js --compress-css $(SRC)/index.html
        @curl -sSd css="$(shell cat $(BUILD.STYLE.CSS))" $(PREFIXR) -o $(BUILD.STYLE.CSS)
        @echo Added Missing Vendor prefixes to stylesheets
        java -jar $(YUICOMPRESSOR) -o $(BUILD.STYLE.CSS) $(BUILD.STYLE.CSS)

```


The sample project uses [htmlcompressor](http://code.google.com/p/htmlcompressor/) for html minification,
[prefixr](http://prefixr.com/) for automatic vendor prefix inclusion.
[yuicompressor](http://developer.yahoo.com/yui/compressor/) for css minification.
You can view source code at https://github.com/alexnormand/demos/tree/gh-pages/2012/03/31


Building the project
--------------------
To build the project simply run
```sh
$ ant
```
or
```sh
$ make
```


This will generate a production release in the **build** folder with all the vendor prefixes automatically added.
And that's it! You won't need to worry about prefixes anymore when releasing your projects.
You should never have to hand code vendor prefixes ever again, you should *always* use tools to handle this tedious
task whether you choose to use CSS preprocessors, client-side solutions, or tools like prefixr.


Further reading
---------------

   * http://paulirish.com/2012/vendor-prefixes-are-not-developer-friendly/
   * http://css-tricks.com/tldr-on-vendor-prefix-drama/
   * http://christianheilmann.com/2012/02/09/now-vendor-prefixes-have-become-a-problem-want-to-help-fix-it/
   * http://infrequently.org/2012/02/misdirection/
   * An alternative to prefixr: [cssprefixer](http://cssprefixer.appspot.com/)
   * [css3please](http://css3please.com/) by Paul Irish
   * [prefixfree](http://leaverou.github.com/prefixfree/) by Lea Verou
   * http://addyosmani.com/blog/client-side-build-process/






