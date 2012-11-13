define(['jquery', 'prettify'], function($, prettify) {
    var site  = {

        //highlight code blocks
        prettify: function() {
                $('pre code').each(function() {
                    var language = $(this).attr('class');

                    if(language) {
                        language = language.split(' ')[0];
                        $(this)
                          .removeClass(language)
                          .addClass('lang-' + language);
                    }


                    $(this).addClass('prettyprint');
                });
                prettyPrint();
        },

        updateMainContent: function(link) {
            var url  = /\.html$/.test(link.href)
                                   ? link.href
                                   : /\/$/.test(link.href)
                                      ? link.href + 'index.html'
                                      : link.href + '/index.html';

            $.get(url, function(data) {

                var pfx = ["webkitAnimationEnd", "mozAnimationEnd", "MSAnimationEnd", "oAnimationEnd", "animationend"],
                    classes= ['animated', 'fadeInLeft'].join(' ');


                if (window.location.host === 'www.alexnormand.com') {
                    window._gaq.push(['_trackPageview', link.href]);
                }

                $('section.content').replaceWith($(data).find('.content'));
                $('section.content').addClass(classes);

                $('section.content').on(pfx.join(' '), function() {
                    $(this).removeClass(classes);
                });

                $(window).scrollTop(0); //for mobile browsers
                $('title').text($(data).filter('title').text()); //set new page title

                site.prettify();

            });
        },

        init: function() {

            if (!!(window.history && history.pushState)) {
                $('#main').on('click', 'a', function(e){
                    var link = e.target;
                    if (link.host === window.location.host) {
                        site.updateMainContent(link);
                        history.pushState(null, null, link.href);
                        e.preventDefault();
                    }
                });

                window.setTimeout(function() {
                    $(window).on('popstate', function(e) {
                        site.updateMainContent(window.location);
                    });
                }, 1000);
            }
            
            this.prettify();
        }
    };

    return site;
});


