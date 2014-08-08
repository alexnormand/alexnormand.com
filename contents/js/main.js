require.config({
  paths: {
    prettify: 'libs/google-code-prettify/src/prettify',
    site: 'site'
  }
});

require(['prettify', 'site'], function(prettify, site) {

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-53654887-1', 'auto');
  ga('send', 'pageview');


  site.init();
});



