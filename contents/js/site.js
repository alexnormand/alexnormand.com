define(['highlight'], function(hljs) {
  var toArray = function(arrayLike) {
    return [].slice.call(arrayLike);
  };

  var find = function(selector, context) {
    return (context || document).querySelector(selector);
  };

  var findAll = function(selector, context) {
    return toArray((context || document).querySelectorAll(selector));
  };

  var site = {

    //highlight code blocks
    prettify: function() {
      findAll('pre code').forEach(hljs.highlightBlock);
    },

    removeTumbleMeClassOnAnimationEnd: function() {
      var prefixes = ["webkit", "moz", "MS", "o", ""];

      prefixes.forEach(function(p) {
        var type = 'AnimationEnd';

        find('.me').addEventListener(p + (p ? type : type.toLowerCase()), function() {
          this.classList.remove('tumbleMe');
        });
      });
    },

    updateMainContent: function(link) {
      var url = /\.html$/.test(link.href)
                  ? link.href
                  : /\/$/.test(link.href)
                    ? link.href + 'index.html'
                    : link.href + '/index.html';

      var xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.responseType = 'document';

      xhr.onload = function() {
        var oldContent = find('#main');
        var newContent = find('#main', this.response);

        oldContent.parentNode.replaceChild(newContent, oldContent);
        find('title').textContent = find('title', this.response).textContent;
        site.prettify();

        newContent.classList.add('animated', 'fadeIn');
        find('.me').classList.add('tumbleMe');
        window.scrollTo(0, 0);

        ga('send', 'pageview', { 'page': url, 'title': find('title').textContent });
      };

      xhr.send();
    },

    init: function() {
      if (!!(history && history.pushState)) {
        find('#layout').addEventListener('click', function(e) {
          var link = e.target;
          if (link.nodeName.match(/a/i) &&
              link.host === location.host &&
              !link.classList.contains('external')) {
            e.preventDefault();
            site.updateMainContent(link);
            history.pushState(null, null, link.href);
          }
        });

        setTimeout(function() {
          window.addEventListener('popstate', function(e) {
            site.updateMainContent(location);
          });
        }, 1000);
      }

      this.prettify();
      this.removeTumbleMeClassOnAnimationEnd();
    }
  };

  return site;
});


