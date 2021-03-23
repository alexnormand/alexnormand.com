+++
title = "Switching to Zola"
date = 2021-03-23
path = "blog/2021/03/23/switching-to-zola"
+++

After almost a decade, I decided to migrate to something a little more modern and easy to use.
The previous version of this site was based on:
  * [grunt](https://gruntjs.com/)
  * [wintersmith](https://github.com/jnordberg/wintersmith)
  * [purecss](https://github.com/pure-css/pure/)
  * Various grunt, babel and npm modules, most of which are outdated, not maintained nor are necessary for such a simple site.

I definitely needed something more simple and straighforward. After considering [Hugo](https://gohugo.io/) & [Hakyll](https://jaspervdj.be/hakyll/)
I stumbled upon [Zola](https://www.getzola.org/) which provides all I ever dreamed of:
* A single executable binary with every included
  * syntax highlighing
  * Jinja2 inspired templating 
  * sass compilation
  * no third-party plugins

Zola is incredibly easy to use. I only had to [download the latest binary for linux](https://github.com/getzola/zola/releases) and move it to `/usr/local/bin`. 

```sh
$ zola init alexnormand.com
$ cd alexnormand.com
$ zola serve
```

The rest is [clearly documented](https://www.getzola.org/documentation/getting-started/overview/) and easy to reason about.

Building this site with zola takes ~100ms (on an ~~very~~ old macbook pro running Debian stable) which is a fraction of the time it used to take to build.

I also migrated to netlify which is more adapted to my needs (this site was previously hosted on [Google App Engine](https://cloud.google.com/appengine/)).
I simply need to `git push` to my github repo master branch and netlify will 
build and deploy the changes automatically in seconds.

Zola and netlify make the whole experience a lot more enjoyable.
An additional bonus to all this is a perf improvement in page load :).


