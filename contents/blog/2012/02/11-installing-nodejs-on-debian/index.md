title:  Installing node.js on Debian stable/testing via aptitude
author: Alex Normand
description: How to install node.js on Debian stable/testing via aptitude
date: 2012-02-11 18:00
template: article.jade


When Installing node.js on Debian you have two options:

   * Compiling it from [source](https://github.com/joyent/node) if you need the latest version of node.js
   * Installing it the Debian Way using the [node.js package](http://packages.debian.org/sid/nodejs)
 available in the official Debian Sid (unstable) repo.

This post will describe how to install node.js from Debian's package manager.

<span class="more"></span>

Step 1: Adding the repo to /etc/apt/sources.list
------------------------------------------------

First of all, you need to add the Debian Sid (unstable) repo to your **/etc/apt/sources.list** file:

```
deb http://ftp.debian.org/debian/ unstable main contrib non-free
```

Step 2: Setting aptitude's default Debian release in /etc/apt/apt.conf
--------------------------------------------------------------------------
Since [node.js](http://packages.debian.org/sid/nodejs) is the only package you 
want to install from the Debian Sid (unstable) repo, you must set aptitude's 
default release. This will prevent all of your packages from being updated to
the unstable version, and therefore prevent upgrading all of your system to Debian Sid (unstable).

Create a **/etc/apt/apt.conf** file and add the following line :

*If you're using testing*
```
  APT:Default-Release "testing";
```
*If you're using stable*
```
  APT:Default-Release "stable";
```


You may want to read about [apt-pinning](http://wiki.debian.org/AptPreferences) if you want to have more fine grained control
over which packages you wish to install on your system.


Step 3: Installing node.js from the package manager
----------------------------------------------------
Then install the package the way you usually do, the only difference is the **-t** option
which sets the release from which the package should be installed.
```
$ aptitude update
$ aptitude install -t unstable nodejs
```

You may also want to install  [npm](http://npmjs.org/). 
Although there is an available debian [package](http://packages.debian.org/sid/npm) in the Debian Sid repo, I recommend
installing it the "official" way:

```
$ curl http://npmjs.org/install.sh | sh
```








