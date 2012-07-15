Requirements
------------
In order to build and test this website you will need the following tools

   * [Google App Engine SDK](http://code.google.com/appengine/downloads.html)
   * [node.js](http://nodejs.org/)


Installing Wintersmith
----------------------

    $ npm install wintersmith -g
    $ npm install wintersmith-stylus -g

Configuring the makefile
----------------------------
You should only have to edit the following variables:

    APPENGINEPATH
    APPENGINEDEV 
    APPENGINEUPLOAD


Then simply type:

    $ make && make serve





