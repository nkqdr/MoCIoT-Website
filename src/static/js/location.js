function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  } else {
    document.getElementById("page-content").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  document.getElementById("page-content").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

function displayLocation(latitude, longitude) {
  var request = new XMLHttpRequest();

  var method = "GET";
  var url =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latitude +
    "," +
    longitude +
    "&sensor=true&key=AIzaSyB4ifBQtSInIQsobCtYfKrWobWeZbBRLl0";
  var async = true;
  request.open(method, url, async);
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      var address = data.results[0];
      console.log(address);
      document.getElementById("page-content").hidden = false;
      // document.getElementById("location-title").hidden = false;
      document.getElementById("location-content").innerHTML =
        address.formatted_address;
    }
  };
  request.send();
}

var successCallback = function (position) {
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  displayLocation(x, y);
};

var errorCallback = function (error) {
  var errorMessage = "Unknown error";
  switch (error.code) {
    case 1:
      errorMessage = "Permission denied";
      break;
    case 2:
      errorMessage = "Position unavailable";
      break;
    case 3:
      errorMessage = "Timeout";
      break;
  }
  document.write(errorMessage);
};

var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};
