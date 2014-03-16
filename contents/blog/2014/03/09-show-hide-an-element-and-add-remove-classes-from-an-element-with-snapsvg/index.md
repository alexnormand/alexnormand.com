---
title: How to show/hide an element and add/remove classes from  an element with Snap.svg
author: Alex Normand
description: How to show/hide an element and add/remove classes from an element with Snap.svg
date: 2014-03-09 13:15
template: article.jade
---

These last couple of weeks I've been working a lot with [Snap.svg](http://snapsvg.io).
Snap.svg is a revamped version of [Raphael](http://raphaeljs.com) which
only supports modern browsers, i.e. those who fully support [SVG](http://www.w3.org/TR/SVG/).
This allows Snap.svg to support all of SVG's cool features such as masking, clipping, groups, ...

<span class="more"></span>

Unfortunately there are no built-in methods to hide or show an element, or
to add and/or remove classes from a given element and apply CSS transitions and animations.

However it is very easy to extend Snap.svg.
I extended the <code>Element</code> prototype like so:

```js
Snap.plugin(function (Snap, Element) {
  var whitespace = /[\x20\t\r\n\f]+/;

  // displays the element
  Element.prototype.show = function() {
    this.attr('display', '');
  };

  // hides the element
  Element.prototype.hide = function() {
    this.attr('display', 'none');
  };

  // toggles the element's visibility
  Element.prototype.toggle = function(showOrHide) {
    showOrHide = showOrHide === undefined
                   ? this.attr('display') === 'none'
                   : !!showOrHide;

    this.attr('display', (showOrHide ? '' : 'none' ));
  };

  // adds one or more space-separated class names.
  Element.prototype.addClass = function() {
    var classes = arguments[0].trim().split(whitespace);

    for (var i = 0; i < classes.length; i++) {
      this.node.classList.add(classes[i]);
    }
  };

  // removes one or more space-separated class names.
  Element.prototype.removeClass = function() {
    var classes = arguments[0].trim().split(whitespace);

    for (var i = 0; i < classes.length; i++) {
      this.node.classList.remove(classes[i]);
    }
  };

  // toggles one or more space-separated class names.
  Element.prototype.toggleClass = function(c) {
    var classes = arguments[0].trim().split(whitespace);

    for (var i = 0; i < classes.length; i++) {
      this.node.classList.toggle(classes[i]);
    }
  };
});
```

To use these functions:

```js
  var s = Snap(450, 450);
  var rect = s.rect(150, 150, 75, 75);

  // show rect
  rect.show()
  rect.toggle(true);

  // hide rect
  rect.hide()
  rect.toggle(false);

  // toggle rect
  rect.toggle()

  // add classes to rect
  rect.addClass('class1 class2 class3');

  // remove classes from rect
  rect.removeClass('class1 class2 class3');

  // toggle classes
  rect.toggleClass('class1 class2 class3');

```

Check out this <a href="/blog/2014/03/09-show-hide-an-element-and-add-remove-classes-from-an-element-with-snapsvg/demo.html" class="external">demo</a>
to see it in action!

```js
(function() {
  var width  = window.innerWidth;
  var height = window.innerHeight;

  var s = Snap(width, height);
  var circle = s.circle(width/2, height/2, width/8).attr({
    'fill'  : '#bada55',
    'stroke': '#333',
    'stroke-width': '5px'
  });

  var square = s.rect(width/6, height/2, width/10, width/10, 35).attr({
    'fill': 'pink',
    'stroke': '#333',
    'stroke-width': '5px'
  });

  var text = s.text(width/2 + width/46, height/2 + width/46, 'click me').attr({
    'font-size': '25px',
    'font-family': 'sans',
    'text-anchor': 'middle'
  });

  var group = s.group(circle, text);

  group.click(function() {
    square.toggleClass('twirl');
    circle.toggleClass('red');
    text.toggle();
  });

}());
```

```css
body {
  margin: 0;
  padding: 0;
}

circle {
  transition: all 1.6s ease;
}

rect {
  -webkit-transform: none;
  -webkit-transform-origin: left top;
  -webkit-animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;

  transform: none;
  transform-origin: left top;
  animation-fill-mode: both;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

g {
  cursor: pointer;
}

.red {
  fill: #C11;
}

.twirl {
  -webkit-animation-name: twirl;
  animation-name: twirl;
}

@-webkit-keyframes twirl {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    fill: #73AEF1;
  }
}

@keyframes twirl {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    fill: #73AEF1;
  }
}
```
