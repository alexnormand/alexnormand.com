+++
title = "How to unzip a zip archive through a unix pipe with bsdtar"
date = 2015-05-31
path = "blog/2015/05/unzipping-a-zip-archive-through-a-unix-pipe-with-bsdtar"
+++

When I'm busy working on a Front-End project I mainly use [chromium](https://www.chromium.org/Home) as my development browser to test the latest bleeding-edge features which have just been pushed to the dev tools.

The latest chromium builds are easily downloadable from [download-chromium](https://download-chromium.appspot.com/).

Simply download the zip archive, unzip it and you're done!


I needed a short script for my mac at work that:

  1. downloads the latest chromium build
  2. unzips the latest chromium build
  3. moves in to the `/Applications` folder.

My first attempt looked like this:

```bash
#!/bin/sh

curl -#L https://download-chromium.appspot.com/dl/Mac > chrome-mac.zip
unzip chrome-mac.zip
cp -fr chrome-mac /Applications
rm -fr chrome-mac chrome-mac.zip
```

I then realized after looking on stackoverflow for a one-liner solution that the unzip command [can't unzip](https://serverfault.com/questions/26474/unzipping-files-that-are-flying-in-through-a-pipe) through a unix pipe (as explained in [ruario's answer](https://serverfault.com/a/589528)).

In his answer, ruario suggests using an implementation of tar (`bsdtar`) which is bundled with [libarchive](https://www.libarchive.org/) on [some variants of BSD](https://unix.stackexchange.com/a/104172).

This version of `bsdtar` can create and extract zip archives!

`bsdtar` can even read a zip file through a pipe when extracting a zip file.
I was able to turn my quick & dirty bash script into a neat one-liner :)

```bash
curl -#L https://download-chromium.appspot.com/dl/Mac | bsdtar -xf- -C /Applications
```

Simply add a new alias to your `.bashrc` or `.bash_profile` file:

```bash
alias dl-chromium='curl -#L https://download-chromium.appspot.com/dl/Mac | bsdtar -xf- -C /Applications'
```

Use with caution, chromium builds can sometimes be unstable!

