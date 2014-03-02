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

        snippet.parentNode.classList.add('prettyprint');
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

        window._gaq.push(['_trackPageview', url]);

        oldContent.parentNode.replaceChild(newContent, oldContent);
        find('title').textContent = find('title', this.response).textContent;
        site.prettify();

        newContent.className += ' animated fadeInLeft';
      };

      xhr.send();
    },

    init: function() {
      if (!!(window.history && history.pushState)) {
        find('#main').addEventListener('click', function(e) {
          var link = e.target;
          if (link.nodeName.toLowerCase() === 'a') {
            e.preventDefault();
            site.updateMainContent(link);
            history.pushState(null, null, link.href);
          }
        });

        window.setTimeout(function() {
          window.addEventListener('popstate', function(e) {
            site.updateMainContent(window.location);
          });
        }, 1000);
      }

      this.prettify();
    }
  };

  return site;
});


