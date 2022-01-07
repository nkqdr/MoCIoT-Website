function listenToMicrophone() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function () {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        if (Math.round(average) > 30) {
          //console.log(Math.round(average));
          increaseSize(10);
        }
        // colorPids(average);
      };
    })
    .catch(function (err) {
      /* handle the error */
      console.error(err);
    });
}

window.addEventListener("resize", () =>
  setBalloonSize(visualViewport.width * 0.5)
);

var size = visualViewport.width * 0.5;
//console.log(size);
setBalloonSize(size);

function setBalloonSize(newSize) {
  if (newSize > 500) {
    newSize = 500;
  }
  //console.log("Setting size to: " + newSize);
  var balloon = document.getElementById("balloon");
  //console.log(balloon);
  document.getElementById("balloon").style.width = `${newSize}px`;
  document.getElementById("balloon").style.height = `${newSize}px`;
}

function increaseSize(deltaSize) {
  var balloon = document.getElementById("balloon");
  //console.log(balloon);
  var currentSize = balloon.style.width;
  //console.log(currentSize);
  var currentSizeNum = parseInt(
    currentSize.substring(0, currentSize.length - 2)
  );
  //console.log(currentSizeNum);
  if (currentSizeNum >= visualViewport.width) {
    // Pop the balloon
    alert("Geschafft!");
    return;
  }
  var newSize = currentSizeNum + parseInt(deltaSize);
  //console.log(newSize);
  document.getElementById("balloon").style.width = `${newSize}px`;
  document.getElementById("balloon").style.height = `${newSize}px`;
}
