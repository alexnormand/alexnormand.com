require.config({
    paths: {
	jquery: 'libs/jquery',
        hljs:   'libs/highlight.pack',
	site:   'site'
    }
});

require(['jquery', 'hljs', 'site'], function($, hljs, site) {

        $(function() {
	    site.init();
	});
});



