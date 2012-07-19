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

		          //remove old iframes inserted by disqus
		          $('iframe[name^="easyXDM_DISQUS"]').remove();		   

              //load Disqus
              site.loadDisqus();

		      });
	    },

      loadDisqus: function() {
          //Disqus
		      if ($('#disqus_thread').length) {
			        var disqus_shortname = 'alexnormand';
			        var dsq = document.createElement('script');
			        dsq.async = true;
			        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
			        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		      }
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

          //load Disqus
          site.loadDisqus();
	    }
	};
    
    return site;
});

