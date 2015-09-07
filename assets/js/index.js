/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $('.hashtags a').first().addClass('active');
        $('.description').html($('.hashtags a').first().data('description'));

        var transition = function() {
            var n = $('.hashtags a.active').next();
            if (n.length == 0) {
                n = $('.hashtags a').first();
            }
            $('.description').html(n.data('description'));
            $('.hashtags a').removeClass('active');
            n.addClass('active');
        };

        var i = setInterval(transition, 6000);

        $('.hashtags a').hover(function() {
            //console.log($(this).data('description'));
            clearInterval(i);
            $('.description').html($(this).data('description'));
            $('.hashtags a').removeClass('active');
            $(this).addClass('active');
        }, function() {
            i = setInterval(transition, 6000);
        });
    });
})(jQuery);
