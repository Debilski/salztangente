        var setLocation = function(location) {
                $('#slider-aside h1').html(location);
        }

        var setCoords = function(coords) {
                // change this
                var maps = "https://www.google.de/maps/place/";
                //

                $('#slider-aside .coords').html('<a href="' + maps + encodeURIComponent(coords) + '" target="_blank">' + coords + '</a>');
        }
        var setDistance = function(distance) {
                $('#slider-aside .distance').text(distance);
        }

        var setAdditional = function(additional, thumb) {
                if (additional) {
                        additional = additional.split(",");
                        if (thumb == undefined) thumb = additional;

                        var htmlCode = ""
                        $.each(additional, function(idx, elem) {
                                htmlCode += '<a href="..' + elem + '"><img src="..' + elem + '.thmb.jpg" width="120" /></a><br>';
                        });
                        $('#slider-aside .slider-aside-image').html("<div>" + htmlCode + "</div>");
                } else {
                        $('#slider-aside .slider-aside-image div').remove();
                }
        }

        function showImage(id) {

                // get DOM for the image
                var image = $('.carousel .item[data-imgid=' + id + ']').first();

                var idx = $('.carousel .item').index(image);

                var thumbIndex = $(image).data("refid");
                var location = $(image).data("location");
                var additional = $(image).data("additional_mobile");
                var additional_thumb = $(image).data("additional_thumb");
                var coords = $(image).data("coordinates");
                var distance = $(image).data("distance");
                var pdf = $(image).data("pdf");
                var pdf_size = $(image).data("pdf_size");

                if (!location) return true;
                if (location) setLocation(location);

                setCoords(coords)
                setDistance(distance)
                setAdditional(additional, additional_thumb);

                if (thumbIndex == undefined || isNaN(thumbIndex)) return true;

                // call the carousel
                $('.carousel').carousel(idx);
                document.location.hash = "/" + (thumbIndex);

                return false;
        }

        function checkHash() {
                if($(location).attr("hash")) {
                        var hash = $(location).attr("hash");
                        var site_id_rgx = /#\/(\d+)/;
                        var site_id = parseInt(site_id_rgx.exec(hash)[1]);

                        return showImage(site_id);
                } else {
                        return showImage(0);
                }
        }

        $(function() {
        // assign a click event to the external thumbnails
        $('.slider-thumbs a').click(function(){
                var thumbIndex = $(this).data("refid");
                return showImage(thumbIndex);
        });


        $('.carousel').on('slide.bs.carousel', function(direction, relatedTarget) {
        });
        $(window).on('hashchange', checkHash);
        //        $('.carousel .item').first().addClass("active");

        if($(location).attr("hash")) {
                var hash = $(location).attr("hash");
                var site_id_rgx = /#\/(\d+)/;
                var site_id = parseInt(site_id_rgx.exec(hash)[1]);

                var image = $('.carousel .item[data-imgid=' + site_id + ']').first();

                var idx = $('.carousel .item').index(image);
                $('.carousel .item:eq('+ idx + ')').addClass("active");
        }

        checkHash();

/*
   $(".carousel").swiperight(function() {
      $(this).carousel('prev');
      showImage($('.carousel .active').data('imgid'));
    });
   $(".carousel").swipeleft(function() {
      $(this).carousel('next');
      showImage($('.carousel .active').data('imgid'));
   });
*/
});


        function showAdditional() {
                window.open("/salztangente" + $(".item.active").first().data("additional_mobile"), '_self');
        }


        function goNext() {
                 if($(location).attr("hash")) {
                        var hash = $(location).attr("hash");
                        var site_id_rgx = /#\/(\d+)/;
                        var site_id = parseInt(site_id_rgx.exec(hash)[1]);

                         showImage(site_id + 1);
                } else {
                         showImage(0 + 1);
                }
        }


        function goPrev() {
                 if($(location).attr("hash")) {
                        var hash = $(location).attr("hash");
                        var site_id_rgx = /#\/(\d+)/;
                        var site_id = parseInt(site_id_rgx.exec(hash)[1]);

                        showImage(site_id - 1);
                } else {
                        showImage(0 - 1);
                }
        }
