define(['jquery', 'hljs'], function($, hljs) {
	var site  = {

	    updateMainContent: function(link) {
		      $.get(link.href, function(data){

		          if (window.location.host === 'www.alexnormand.com') {
			            _gaq.push(['_trackPageview', link.href]);
		          }

		          $('section.content').replaceWith($(data).find('.content'));
		          $('section.content').children()
                  .hide()
                  .fadeIn(500);

		          $(window).scrollTop(0); //for mobile browsers
		          $('title').text($(data).filter('title').text()); //set new page title

              //highligh code blocks
              $('pre code').each(function(i, e) {
                  if ($(e).attr('class') === undefined) {
                      $(e).attr('class', 'no-highlight');
                  }
                  hljs.highlightBlock(e);
              });
		      });
	    },
      
	    init: function() {

		      if(!!(window.history && history.pushState)) {
		          $('#mainmain').on('click', 'a', function(e){
			            var link = e.target;
			            if(link.host === window.location.host) {
			                site.updateMainContent(link);
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
          

		      $('select.main_nav').change(function() {
		          var option = $(this).find(':selected');
              
		          option.prop('selected', true);
              
		          if (option.val().indexOf('/') === 0) {
			            site.updateMainContent({href: option.val()});
		          } else {
			            window.location = option.val();
		          }
              
		      });
          
          //init highlight.js
          hljs.initHighlighting();
    
	    }
	};
    
    return site;
});

