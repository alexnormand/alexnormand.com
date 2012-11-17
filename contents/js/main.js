require.config({
  paths: {
    jquery: 'libs/jquery',
    prettify: 'libs/prettify',
    noisy: 'libs/jquery.noisy.min',
    site: 'site'
  },

  shim: {
    'noisy': {
      deps: ['jquery'],
      exports: 'jQuery.fn.noisy'
    }
  }
});

require(['jquery', 'prettify', 'site', 'noisy'], function($, prettify, site) {

  $(function() {
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', 'UA-27119715-3']);
    window._gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    site.init();

  });
});



