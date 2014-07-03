---
title: How to enhance a static site with pjax and the responseType XHR2 attribute
author: Alex Normand
description: HHow to enhance a static site with pjax and the responseType XHR2 attribute
date: 2014-06-15 19:19
template: article.jade
---


In this post, we'll study how to progressively enhance a static website
(e.g. generated using a SSG like [jekyll](http://jekyllrb.com/) or [wintersmith](http://wintersmith.io/)) by using pjax (HTML5 pushState + AJAX)
and [responseType](http://www.w3.org/TR/XMLHttpRequest2/#dom-xmlhttprequest-responsetype)
(an attribute introduced by [XHR2](http://www.w3.org/TR/XMLHttpRequest2/)) in 40 lines of vanilla JavaScript.

<span class="more"></span>


## Introduction
*Pjax* allows you to progressively enhance a site by loading new content
via AJAX requests and updating the browser's URL and history when a user
clicks on a link.

The *responseType* attribute lets you specify the response format of a XHR request.
It can be one of the following:

  - arrayBuffer
  - blob
  - document
  - json


## The *responseType* attribute

We'll focus on the [document](http://www.w3.org/TR/XMLHttpRequest/#document-response-entity-body)
responseType. This will set the response type to be a document object rather than just plain text:

```js
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'document';

   xhr.open('GET', '/');
   xhr.onload = function() {
      var title = this.response.querySelector('title');

      console.log(title.textContent);
   };

   xhr.send();
```

Copy this example in your dev tools console.
This should output:

<code>Alex Normand - Adventures in HTML5, CSS3, JavaScript and the open Web.</code>

You can use this.response the exact same way you would use **<code>window.document</code>**
This is really powerful as you can basically use the xhr's response to replace any DOM node.

```js
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'document';

   xhr.open('GET', '/');
   xhr.onload = function() {
      var responseMain = this.response.querySelector('#main');
      var currentMain  = document.querySelector('#main');

      currentMain.parentNode.replaceChild(responseMain, currentMain);
   };

   xhr.send();
```

Copy this example in your dev tools, and see what happens then hit your browser's refresh button.
The content of the webpage was replaced by the response content.
However the browser's URL remained unchanged, this is where **<code>history.pushState</code>** comes in.

## history.pushState

```js
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'document';

   xhr.open('GET', '/');
   xhr.onload = function() {
      var responseMain = this.response.querySelector('#main');
      var currentMain  = document.querySelector('#main');

      currentMain.parentNode.replaceChild(responseMain, currentMain);

      history.pushState(null, null, '/');
   };

   xhr.send();
```

**<code>history.pushState(null, null, '/')</code>**
pushes '/' onto the session history and updates the browser's URL.
We also need to add a popstate event handler to deal with the browser's back button click
or a call to <code>history.back()</code>.
(see demo code below for an example).


## Browser support

ResponseType and history.pushState seem really cool, but are they well supported?


Yes definitely! This technique works in all modern browsers and degrades gracefully in
older browsers (i.e. IE9 and old android versions).

 * [responseType="document"](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest#AutoCompatibilityTable)
 * [history](http://caniuse.com/#feat=history)


## Demo

To demonstrate how powerful this is, I've written a simple Moby Dick example.
The demo uses the combination of **<code>responseType="document"</code>** and **<code>history.pushState</code>** as shown above:

  * [click here to view demo](http://alexnormand.github.io/moby-dick-demo/chapters/1.html)
  * [github repo](https://github.com/alexnormand/moby-dick-demo)



```js
(function(){
  var MAIN_CONTENT_SELECTOR = '#main';

  var find = function(selector, context) {
    return (context || document).querySelector(selector);
  };

  var loadChapter = function(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'document';

    xhr.onload = function() {
      var newChapter = find(MAIN_CONTENT_SELECTOR, this.response);
      var newTitle = find('title', this.response).textContent;
      var currentChapter = find(MAIN_CONTENT_SELECTOR);

      find('title').textContent = newTitle;

      currentChapter.parentNode.replaceChild(newChapter, currentChapter);
      find('.chapter').classList.add('animated', 'fadeInUpBig');
      window.scrollTo(0, 0);
    };

    xhr.send();
  };

  if (history && history.pushState) {

    find('body').addEventListener('click', function(e) {

      if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        loadChapter(e.target.href);
        history.pushState(null, null, e.target.href);
      }
    });

    setTimeout(function() {
      window.onpopstate = function() {
        loadChapter(window.location.href);
      };
    }, 1000);
  }
}())

```
