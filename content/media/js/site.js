define(['jquery'], function($) {
	var site  = {	

	    mainContent: undefined,	

	    updateMainContent: function (link) {  
		$.get(link.href, function(data){ 
		    $('section.content').replaceWith($(data).find('.content'))
		    $('section.content').children()
                        .hide()
                        .fadeIn(500);

		    $(window).scrollTop(0); //for mobile browsers                                
		    $('title').text($(data).filter('title').text()) //set new page title

		    site.mainContent = $('.content');
		    /*$('.vid').each(function(index, element){		   
		      site.prepareVideo(element);
		      });*/		
		});      
	    },  

	    /*
	      prepareVideo: function(element) {
	      sublimevideo.prepare(element);
	      site.resizeVideo(element);
	      },

	      resizeVideo: function(element) {
	      var width = site.mainContent.width();		
	      sublimevideo.resize(element, width, width / 1.57667);			    
	      },*/

	    init: function() {
		
		site.mainContent = $('.content');
		//sublimevideo.load();	

		if(!!(window.history && history.pushState)) {
		    $('#mainmain').on('click', 'a', function(e){  
			var link = e.target;    
			if(link.host === window.location.host) { 
			    site.updateMainContent(link);	

			    /*$('.vid').each(function(index, element){
			      site.prepareVideo(element);
			      });*/

			    history.pushState(null, null, link.href);
			    e.preventDefault();
			}
		    });
		    
		    window.setTimeout(function() {
			$(window).bind('popstate', function(e) {
			    site.updateMainContent(window.location);
			});     
		    }, 1000);      		
		}
		
		/*$(window).resize(function(){
		  $('.vid').each(function(index, element){
		  site.resizeVideo(element);
		  });
		  });

		  sublimevideo.ready(function() {				
		  $('.vid').each(function(index, element){
		  site.prepareVideo(element);
		  });
		  });*/	   
	    }
	};

    return site;
});
