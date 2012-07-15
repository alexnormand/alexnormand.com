require.config({
    paths: {
 	order: 'libs/require/order',
	jquery: 'libs/jquery',
        hljs:   'libs/highlight.pack',
	site:   'site'
    }
});


require(['order!jquery', 'order!hljs', 'order!site'], function($, hljs, site) {

        $(function() {
	    site.init();
	});
});



