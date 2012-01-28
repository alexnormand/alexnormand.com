require.config({
    paths: {
 	order: 'libs/require/order',
	jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
	site: 'site'
    }
});


require(['order!jquery', 'order!site'], function($, site) {

        $(function() {		
	    site.init();    
	});
});
	


