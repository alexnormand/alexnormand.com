require.config({
    paths: {
 	order: 'libs/require/order',
	jquery: 'libs/jquery',
	site: 'site'
    }
});


require(['order!jquery', 'order!site'], function($, site) {

        $(function() {		
	    site.init();    
	});
});
	


