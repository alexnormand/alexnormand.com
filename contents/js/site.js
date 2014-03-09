define(['prettify'], function(prettify) {
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

      findAll('pre code').forEach(function(snippet) {
        var language = snippet.className;

        if (language) {
          snippet.classList.remove(language);
          snippet.parentNode.classList.add(language);
        }

        snippet.parentNode.classList.add('prettyprint', 'linenums');
      });

      prettyPrint();
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
        var oldContent = find('section.content');
        var newContent = find('.content', this.response);

        _gaq.push(['_trackPageview', url]);

        oldContent.parentNode.replaceChild(newContent, oldContent);
        find('title').textContent = find('title', this.response).textContent;
        site.prettify();

        newContent.classList.add('animated','fadeInLeft');
      };

      xhr.send();
    },

    init: function() {
      if (!!(history && history.pushState)) {
        find('#main').addEventListener('click', function(e) {
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
    }
  };

  return site;
});


