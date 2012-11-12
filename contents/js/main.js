require.config({
  paths: {
    jquery: 'libs/jquery',
    prettify: 'libs/prettify',
    site:   'site'
  }
});

require(['jquery', 'prettify', 'site'], function($, prettify, site) {

  $(function() {
    site.init();
	});
});



