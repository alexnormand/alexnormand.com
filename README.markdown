Requirements
------------
In order to build and test this website you will need the following tools

   * [hyde](https://github.com/hyde/hyde)
   * [Google App Engine SDK](http://code.google.com/appengine/downloads.html)
   * [yuicompressor](http://developer.yahoo.com/yui/compressor/)
   * [RequireJS optimization tool](http://requirejs.org/docs/optimization.html)
   * [nodejs](http://nodejs.org/)

Configuring the makefile
----------------------------
You should only have to edit the following variables:

   * TOOLS
   * YUI
   * REQUIREJS.OPTIMIZE
   * APPENGINEPATH


You must set the right execution paths to run all the tools mentioned above.

Then simply type:

    $ make
    $ make serve





