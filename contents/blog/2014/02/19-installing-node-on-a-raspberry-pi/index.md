---
title: Installing node.js on a Raspberry Pi
author: Alex Normand
description: Installing node.js on a Raspberry Pi
date: 2014-02-19 00:15
template: article.jade
---

Several months ago I acquired my very first [Raspberry PI](http://www.raspberrypi.org/).
One of the first things I wanted to try is how well node runs on a Raspberry Pi.
Node works like a charm and installing it on a Raspberry is actually pretty easy and straightforward.

<span class="more"></span>


Download the binary archive and Extract it
------------------------------------------
First of all you must download the latest node binary archive that is compatible with
the Raspberry Pi's ARM-based architecture.
I wrote **[nodepi](http://nodepi.herokuapp.com)** a little express app which lists all of the
node versions which provide an official *arm-pi* binary archive.

Simply grab the version you want (remember that node uses the
[even/odd](http://en.wikipedia.org/wiki/Software_versioning#Odd-numbered_versions_for_development_releases)
version numbering system) and click the *download* button.

You can also curl the version you wish to download.

```sh
$ curl -L http://nodepi.herokuapp.com/v0.10.24 -o node.tar.gz
$ tar xvfz node.tar.gz
```

Note that nodepi simply redirects to the appropriate file location on <code>http://nodejs.org/dist</code>.
The main reason why I wrote nodepi was to not have to manually look through nodejs.org/dist for
a specific node version which has an available *arm-pi* binary.

Update your PATH
----------------
There are many great blog posts that will show you how to update your path so you can
execute *node* in your terminal

 * http://joshondesign.com/2013/10/23/noderpi
 * http://oskarhane.com/raspberry-pi-install-node-js-and-npm/


Basically once you've extracted the node archive, move it to a predictable location
and simply add that location to your path in your <code>.bash_profile</code> file and your done!


```sh
$ PATH=$PATH:/home/pi/node-vx.x.x/bin
$ export PATH
```


To check that node and npm have been correctly added to your path:

```sh
$ node -v
$ npm -v
```

