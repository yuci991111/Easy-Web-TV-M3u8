$(document).ready(function() {
    //Check sser IP belongs to if in China, North Korea or Iran. 
    try {
        getUserIp();
    } catch (e) {
        console.log(e)
    }
    //Toggle Menu
    $('#main').click(function() {
        if ($('#mySidenav').is(':visible')) {
            $(this).css({
                'marginRight': '0'
            });
            $('#mySidenav').hide();
        } else {
            if ($(window).width() > 640) {
                $(this).css({
                    'marginRight': '400px'
                });
            } else {
                $(this).css({
                    'marginRight': '250px'
                });
            }
            $('#mySidenav').show();
        };
    });
    //Select TV Options
    $('.stylebtn:eq(0)').on('click', function() {
        if ($('input[name=radioName]:checked', '#selectform').val() == 1) {
            window.location.href = "routes/countries.html";
        } else if ($('input[name=radioName]:checked', '#selectform').val() == 2) {
            window.location.href = "routes/language.html";
        } else {
            window.location.href = "routes/category.html";
        }
    });
    //Check sensetive content if or not
    $('#adultban').on('change', function() {
        if ($(window).width() > 640) {
            if ($(this).is(':checked')) {
                $('.mobile').append(`<li><img src="images/sex.svg" /><dd><a href="routes/adult.html"><button class="stylebtn">Enter</button></a></dd><p>Porn Videos...</p></li>`);
                $('#four_flash .flashBg ul.mobile li').css({
                    'width': '32%'
                })
            } else {
                $('.mobile li:eq(2)').remove();
                $('#four_flash .flashBg ul.mobile li').css({
                    'width': '48%'
                })
            }
        } else {
            if ($(this).is(':checked')) {
                $('.mobile').append(`<li><img src="images/sex.svg" /><dd><a href="routes/adult.html"><button class="stylebtn">Enter</button></a></dd><p>Porn Videos...</p></li>`);
            } else {
                $('.mobile li:eq(2)').remove();
            }
        }
    });
});

//Get User IP
function getUserIp() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.ipdata.co/?api-key=7910661894e758448cbebb4a636485005498427178dea6ef0e911311');

    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            let country = JSON.parse(this.responseText).country_code;
            if (country.toLowerCase() == 'cn' || country.toLowerCase() == 'kp') {
                $('#main').hide();
            }
        } else {
            getCoordintes();
        }
    };
    request.send();
}
// Step 1: Get user coordinates
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        var xhr = new XMLHttpRequest();
        var lat = coordinates[0];
        var lng = coordinates[1];

        // Paste your LocationIQ token below.
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.dd067483fe694f72f04c0fdd2d312091&lat=" + lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var city = response.address;
                if (city.country_code == 'cn' || city.country_code == 'kp') {
                    $('#main').hide();
                };
            }
        }
        return;
    }

    function error(err) {
        console.log(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}