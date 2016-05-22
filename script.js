$(document).ready(function() {

    $("form").submit(function(evt) {
        $("#submit").attr("disabled", true).val("Searching...");
        $("#search").prop("disabled", true);

        evt.preventDefault();
        var searchTerm = $("#search").val();
        var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var flickrOptions = {
            tags: searchTerm,
            format: "json"
        };

        function displayPhotos(data) {
            var photoHTML = "<ul>";
            $.each(data.items, function(i, photo) {
                photoHTML += "<li class='grid'>";
                photoHTML += "<a href='" + photo.link + "' class = 'image' target='_blank'>";
                photoHTML += "<img src='" + photo.media.m + "'></a></li>";
            });
            photoHTML += "</ul>";
            $("#photos").html(photoHTML);
            $("#submit").attr("disabled", false).val("Search");
            $("#search").prop("disabled", false);
        }
        $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    });
});