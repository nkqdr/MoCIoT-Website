var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
if (isMobile.any()) {
  document.getElementById("scaleStationTitle").style.display = "none";
  document.getElementById("scale-content").style.display = "flex";
}

const SCALE_TOLERANCE = 10;

var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1 / 60; // Sensor refresh rate

function orientationListener(event) {
  // Expose each orientation angle in a more readable way
  rotation_degrees = event.alpha;
  frontToBack_degrees = event.beta;
  leftToRight_degrees = event.gamma;

  // Update velocity according to how tilted the phone is
  // Since phones are narrower than they are long, double the increase to the x velocity
  vx = vx + leftToRight_degrees * updateRate * 2;
  vy = vy + frontToBack_degrees * updateRate;

  // Update position and clip it to bounds
  px = px + vx * 0.2;
  if (px > 98 || px < 0) {
    px = Math.max(0, Math.min(98, px)); // Clip px between 0-98
    vx = 0;
  }

  py = py + vy * 0.2;
  if (py > 98 || py < 0) {
    py = Math.max(0, Math.min(98, py)); // Clip py between 0-98
    vy = 0;
  }

  dot = document.getElementsByClassName("indicatorDot")[0];
  dot.setAttribute("style", "left:" + px + "%;" + "top:" + py + "%;");
  center = document.getElementById("scaleCenter");
  var rect = center.getBoundingClientRect();
  var dotPos = dot.getBoundingClientRect();
  if (
    Math.abs(rect.top - dotPos.top) < SCALE_TOLERANCE &&
    Math.abs(rect.right - dotPos.right) < SCALE_TOLERANCE &&
    Math.abs(rect.bottom - dotPos.bottom) < SCALE_TOLERANCE &&
    Math.abs(rect.left - dotPos.left) < SCALE_TOLERANCE
  ) {
    alert(`Center: ${rect.top}, ${rect.right}, ${rect.bottom}, ${rect.left}`);
  }
}

function getAccel() {
  if (isMobile.iOS()) {
    DeviceMotionEvent.requestPermission().then((response) => {
      if (response == "granted") {
        // Add a listener to get smartphone orientation
        // in the alpha-beta-gamma axes (units in degrees)
        window.addEventListener("deviceorientation", orientationListener);
      } else {
        alert("Konnte die Berechtigungen nicht einholen.");
      }
    });
  } else {
    if (window.DeviceMotionEvent == undefined) {
      alert("Konnte die Berechtigungen nicht einholen.");
    } else {
      alert("accelerometer found");
      window.addEventListener("deviceorientation", orientationListener, true);
    }
  }
}
