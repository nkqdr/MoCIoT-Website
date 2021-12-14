function testButton() {
  console.log("Clicked.");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("page-content").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function showError(error) {
  console.log(error);
}

function showPosition(position) {
  document.getElementById("page-content").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}
