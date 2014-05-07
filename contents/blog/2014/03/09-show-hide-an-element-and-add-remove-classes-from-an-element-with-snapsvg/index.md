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
  var whitespace = /[\x20\t\r\n\f]+/g;

  var toggleClasses = function(classes, className, add) {
    classes = classes.trim().split(whitespace);
    className = className.replace(whitespace, ' ');

    var newClassName = classes.reduce(function(prevClassName, clazz) {
      var clazzIndex = prevClassName.indexOf(' ' + clazz + ' ');
      clazz = clazz + ' ';

      if (add) {
        if (clazzIndex === -1) {
          return prevClassName + clazz;
        }
      } else {
        if (clazzIndex !== -1) {
          return prevClassName.replace(clazz, '');
        }
      }

      return prevClassName;
    }, ' ' + className + ' ');

    if (className !== newClassName) {
      return newClassName.trim();
    }
  };

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
  Element.prototype.addClass = function(classes) {
    var newClassName = toggleClasses(classes, this.node.className.baseVal, true);

    if (newClassName !== undefined) {
      this.node.className.baseVal = newClassName
    }
  };

  // removes one or more space-separated class names.
  Element.prototype.removeClass = function(classes) {
    var newClassName = toggleClasses(classes, this.node.className.baseVal, false);

    if (newClassName !== undefined) {
      this.node.className.baseVal = newClassName;
    }
  };

  // toggles the specified class name.
  Element.prototype.toggleClass = function(clazz, toggle) {
    var className = ' ' + this.node.className.baseVal.replace(whitespace, ' ') + ' ';
    clazz = clazz.trim();
    toggle = toggle === undefined
               ? className.indexOf(' ' + clazz + ' ') === -1
               : !!toggle;

    if (toggle) {
      this.addClass(clazz);
    } else {
      this.removeClass(clazz);
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
  rect.toggleClass('class1');
  rect.toggleClass('class1', true);
  rect.toggleClass('class1', false);

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


### Update: 2014/03/29
After doing a little more [research](http://caniuse.com/#search=classList), it turns out that <code>classList</code> on SVG Elements
is not supported in IE, Android Browser and Safari.

I updated <code>addClass</code>, <code>removeClass</code> and <code>toggleClass</code> for full browser support.
(all browsers that support ECMAScript 5).

### Update: 2014/05/07
[Dmitry](http://dmitry.baranovskiy.com/) has [recently](https://github.com/adobe-webplatform/Snap.svg/commit/51afce7824bb2ea99811950d8170e7cd488e8789) added The <strong><code>addClass</code></strong>, <strong><code>removeClass</code></strong> and <strong><code>hasClass</code></strong> functions in Snap.svg's dev branch. So these new features should be available in the next stable release, making this plugin obsolete and irrelevant :).
