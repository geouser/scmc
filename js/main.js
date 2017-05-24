// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });


    /*---------------------------
                                  Owl carousel
    ---------------------------*/
    $('.owl-carousel-gallery').owlCarousel({
        items: 4,
        margin: 4,
        nav: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 2,
            },
            // breakpoint from 480 up
            480 : {
                items: 3,
            },
            // breakpoint from 768 up
            768 : {
                items: 4,
            }
        }
    });


    $('.owl-carousel-customers').owlCarousel({
        items: 5,
        margin: 0,
        nav: true,
        dots: false,
        navText: ['', ''],
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 2,
            },
            // breakpoint from 480 up
            480 : {
                items: 3,
            },
            // breakpoint from 768 up
            768 : {
                items: 4,
            },
            // breakpoint from 768 up
            992 : {
                items: 5,
            }
        }
    });


    $('.owl-carousel-products').owlCarousel({
        items: 3,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['', ''],
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 1,
            },
            // breakpoint from 480 up
            480 : {
                items: 2,
            },
            // breakpoint from 480 up
            768 : {
                items: 3,
            }
        }
    });




    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.navbar'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 120);
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.mainNav a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('open');
        $(this).siblings('header').toggleClass('open');
        if ($('header').hasClass('open')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'visible');
            }
    });




    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
        
    });



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }


    $('.form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*Google map init*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 16,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.svg');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"SCMC"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file