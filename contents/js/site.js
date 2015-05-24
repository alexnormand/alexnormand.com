import hljs from './highlight.js';

const $ = (selector, context) => {
  return (context || document).querySelector(selector);
};

const $$ = (selector, context) => {
  return [].slice.call((context || document).querySelectorAll(selector));
};

const site = {

  //highlight code blocks
  prettify() {
    $$('pre code').forEach(hljs.highlightBlock);
  },

  removeTumbleMeClassOnAnimationEnd() {
    const prefixes = ['webkit', 'moz', 'MS', 'o', ''];

    prefixes.forEach(function(p) {
      const type = 'AnimationEnd';

      $('.me').addEventListener(p + (p ? type : type.toLowerCase()), function() {
        this.classList.remove('tumbleMe');
      });
    });
  },

  updateMainContent(link) {
    const url = /\.html$/.test(link.href)
                ? link.href
                : /\/$/.test(link.href)
                  ? link.href + 'index.html'
                  : link.href + '/index.html';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'document';

    xhr.onload = () => {
      const oldContent = $('#main');
      const newContent = $('#main', xhr.response);

      oldContent.parentNode.replaceChild(newContent, oldContent);
      $('title').textContent = $('title', xhr.response).textContent;
      site.prettify();

      newContent.classList.add('animated', 'fadeIn');
      $('.me').classList.add('tumbleMe');
      window.scrollTo(0, 0);

      window.ga('send', 'pageview', { 'page': url, 'title': $('title').textContent });
    };

    xhr.send();
  },

  init() {
    if (!!(history && history.pushState)) {
      $('#layout').addEventListener('click', (e) => {
        const link = e.target;
        if (link.nodeName.match(/a/i) &&
            link.host === location.host &&
            !link.classList.contains('external')) {
          e.preventDefault();
          site.updateMainContent(link);
          history.pushState(null, null, link.href);
        }
      });

      setTimeout(() => {
        window.addEventListener('popstate', (e) => {
          site.updateMainContent(location);
        });
      }, 1000);
    }

    this.prettify();
    this.removeTumbleMeClassOnAnimationEnd();
  }
};

export default site;
