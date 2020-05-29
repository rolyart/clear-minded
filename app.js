var timer;
var percent = 0;
var audio = document.getElementById("audio");
var btnText = document.getElementById('btn');

audio.addEventListener("playing", function(_event) {
    var duration = _event.target.duration;
    advance(duration, audio);
});

audio.addEventListener("pause", function(_event) {
    clearTimeout(timer);
});

var advance = function(duration, element) {
    var progress = document.getElementById("progress");
    increment = 10/duration
    percent = Math.min(increment * element.currentTime * 10, 100);
    progress.style.width = percent+'%';
    if(percent.toFixed()>=10) document.body.style.backgroundColor = '#5243AA';
    if(percent.toFixed()>25) document.body.style.backgroundColor = '#DE350B';
    if(percent.toFixed()>40) document.body.style.backgroundColor = '#FFC400';
    if(percent.toFixed()>55) document.body.style.backgroundColor = '#FFC400';
    if(percent.toFixed()>70) document.body.style.backgroundColor = '#00D763';
    if(percent.toFixed()>90) document.body.style.backgroundColor = '#007AFE';

    if(percent.toFixed()==100){ 
      btnText.innerHTML = 'Congratulations! Let start again';
      setTimeout(()=>{
        document.body.style.backgroundColor = '#091E42';
      },3000)
    }
    startTimer(duration, element);
}
var startTimer = function(duration, element){ 
    if(percent < 100) {
      timer = setTimeout(function (){advance(duration, element)}, 100);
    }
}

function togglePlay (e) {
    e = e || window.event;
    if (!audio.paused) {
      btnText.innerHTML = 'PLAY';
      audio.pause();
      isPlaying = false;
    } else {
        btnText.innerHTML = 'PAUSE';
      audio.play();
      isPlaying = true;
    }
}

// Loading screen
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('#loading', false);
});