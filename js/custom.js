
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* 1.Intro Height  */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

$(document).ready(function () {
    function introHeight() {
        var wh = $(window).height();
        $('#intro').css({height: wh});
    }

    introHeight();

    $(window).bind('resize',function () {

        //Update slider height on resize
        introHeight();
    });


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* 2.Owl Carousel Init  */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    "use strict";
    var owl = $("#owl-intro");

    owl.owlCarousel({
        // Most important owl features
        autoPlay: 3000,
        items : 1,
        itemsCustom : false,
        itemsDesktop : [1199,1],
        itemsDesktopSmall : [980,1],
        itemsTablet: [768,1],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        singleItem : true,
        itemsScaleUp : true,
        navigation:	false,
        pagination:	false,
        transitionStyle : "backSlide"


    });

//    $("#owl-about").owlCarousel({
//        singleItem:true,
//        navigation: true,
//        navigationText: [
//            "<i class='fa fa-angle-left fa-2x'></i>",
//            "<i class='fa fa-angle-right fa-2x'></i>"
//        ],
//        touchDrag:	false
//    });


    $("#owl-blogPost").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ],
    });


//    $("#owl-team").owlCarousel({
//        items:4,
//        navigation: false,
//        temsCustom : false,
//        itemsDesktop : [1199,4],
//        itemsDesktopSmall : [980,3],
//        itemsTablet: [768,2],
//        itemsMobile : [479,1]
//    });


    $("#owl-clients").owlCarousel({
        items:4,
        navigation: false
    });



    $("#owl-testimonials").owlCarousel({
        singleItem:true
    });


    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $( "#intro" ).css( "background-attachment", "scroll" );
        $( "#charts" ).css( "background-attachment", "scroll" );
        $( "#testimonials" ).css( "background-attachment", "scroll" );
        $( "#clients" ).css( "background-attachment", "scroll" );
        $( "#video" ).css( "background-attachment", "scroll" );
        $( "#textSeparator" ).css( "background-attachment", "scroll" );
    }

    else{
        $.stellar({
            responsive: true,
            horizontalOffset: 0,
            horizontalScrolling:false
        });

    }



    $('#charts').waypoint(function() {
        "use strict";
        // first timer
        $('.timer1').countTo({

            from: 0, // the number you want to start
            to: 125, // the number you want to reach
            speed: 125,
            refreshInterval: 1

        });

        // second timer
        $('.timer2').countTo({

            from: 0,// the number you want to start
            to: 71,// the number you want to reach
            speed: 250,
            refreshInterval: 1

        });


        // third timer
        $('.timer3').countTo({

            from: 0,// the number you want to start
            to: 80,// the number you want to reach
            speed: 250,
            refreshInterval: 1
        });


        // fourth timer
        $('.timer4').countTo({

            from: 0,// the number you want to start
            to: 200,// the number you want to reach
            speed: 250,
            refreshInterval: 1,
            onComplete: function(value) {
                $( '.timer' ).stop();
            }

        });


    }, { offset: 500 });


    var $container = $('.gallery').imagesLoaded( function() {
        $container.isotope({
            // options
        });
    });


    $('#filters').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    $container.isotope({
        filter: '*' // IF YOU WANT TO DISPLAY AT FIRST ONLY ONE FILTER, FOR EXAMPLE DESIGNS: SUBSTIUTE '*' WITH '.designs'
    });


    $('.gallery-inner').magnificPopup({
        delegate: ' .popup-link',
        gallery: {
            enabled: true, // set to true to enable gallery

            navigateByImgClick: true,

            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button

        },
        type: 'image',
        mainClass: 'mfp-fade',
        // Info about options is in docs:
        // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

        tLoading: 'Loading...'
    });



    $('.featuredWork').magnificPopup({
        delegate: ' .popup-link',
        gallery: {
            enabled: true, // set to true to enable gallery

            navigateByImgClick: true,

            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button

        },
        type: 'image',
        mainClass: 'mfp-fade',
        // Info about options is in docs:
        // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

        tLoading: 'Loading...'
    });


    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 100,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* 8. Google Map Init */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


    // function initialize() {
    //     var map_canvas = document.getElementById('googleMap');

    //     var map_options = {
    //         center: new google.maps.LatLng(48.8697366,2.4679583),
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP,
    //         scrollwheel: false
    //     };

    //     var map = new google.maps.Map(map_canvas, map_options);
    //     var marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(48.8697366,2.4679583),
    //         map: map,
    //         title: 'Sous-titre.com'
    //     });
    //     var styles = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-77}]},{"featureType":"road"}]
    //     map.setOptions({styles: styles});
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);




    smoothScroll.init({
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
        callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
    });


    $('#filters .btn').tooltip();

    $("body").fitVids();





});




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* 12. Preloader */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


$(window).load(function() {    // makes sure the whole site is loaded
    "use strict";
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(100).css({'overflow':'visible'});
})




//
///** Used Only For Touch Devices **/
//$( function( window ) {
//
//    // for touch devices: add class cs-hover to the figures when touching the items
//    if( Modernizr.touch ) {
//
//        // classie.js https://github.com/desandro/classie/blob/master/classie.js
//        // class helper functions from bonzo https://github.com/ded/bonzo
//
//        function classReg( className ) {
//            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
//        }
//
//        // classList support for class management
//        // altho to be fair, the api sucks because it won't accept multiple classes at once
//        var hasClass, addClass, removeClass;
//
//        if ( 'classList' in document.documentElement ) {
//            hasClass = function( elem, c ) {
//                return elem.classList.contains( c );
//            };
//            addClass = function( elem, c ) {
//                elem.classList.add( c );
//            };
//            removeClass = function( elem, c ) {
//                elem.classList.remove( c );
//            };
//        }
//        else {
//            hasClass = function( elem, c ) {
//                return classReg( c ).test( elem.className );
//            };
//            addClass = function( elem, c ) {
//                if ( !hasClass( elem, c ) ) {
//                    elem.className = elem.className + ' ' + c;
//                }
//            };
//            removeClass = function( elem, c ) {
//                elem.className = elem.className.replace( classReg( c ), ' ' );
//            };
//        }
//
//        function toggleClass( elem, c ) {
//            var fn = hasClass( elem, c ) ? removeClass : addClass;
//            fn( elem, c );
//        }
//
//        var classie = {
//            // full names
//            hasClass: hasClass,
//            addClass: addClass,
//            removeClass: removeClass,
//            toggleClass: toggleClass,
//            // short names
//            has: hasClass,
//            add: addClass,
//            remove: removeClass,
//            toggle: toggleClass
//        };
//
//        // transport
//        if ( typeof define === 'function' && define.amd ) {
//            // AMD
//            define( classie );
//        } else {
//            // browser global
//            window.classie = classie;
//        }
//
//        [].slice.call( document.querySelectorAll( 'ul.grid > li > figure' ) ).forEach( function( el, i ) {
//            el.querySelector( 'figcaption > a' ).addEventListener( 'touchstart', function(e) {
//                e.stopPropagation();
//            }, false );
//            el.addEventListener( 'touchstart', function(e) {
//                classie.toggle( this, 'cs-hover' );
//            }, false );
//        } );
//
//    }
//
//});




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* Mobile bug fixes  */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/* LOAD animations.css only on desktop */



if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/animate.css') );
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       150,          // distance to the element when triggering the animation (default is 0)
            mobile:       false        // trigger animations on mobile devices (true is default)
        }
    );
    wow.init();
}




if(Modernizr.touch){
    $('.caption .valign').css("top","40px");
}

$('.gallery-inner').bind('touchstart', function() {
    $(this).addClass('.caption');
});

$('.gallery-inner').bind('touchend', function() {
    $(this).removeClass('.caption');
});


$('.featuredWork').bind('touchstart', function() {
    $(this).addClass('.caption');
});

$('.featuredWork').bind('touchend', function() {
    $(this).removeClass('.caption');
});



