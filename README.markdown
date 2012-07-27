Requirements
------------
In order to build and test this website you will need the following tools:

   * [node.js](http://nodejs.org/)


Installing Wintersmith
----------------------

    $ npm install wintersmith -g
    $ npm install wintersmith-stylus -g

Building & testing the site
----------------------------

Then simply type:

    $ git clone https://github.com/alexnormand/alexnormand.com.git
    $ cd alexnormand.com
    $ make
    $ cd appengine/static
    $ python -m SimpleHTTPServer

open [http://localhost:8000/](http://localhost:8000/) in your browser.





