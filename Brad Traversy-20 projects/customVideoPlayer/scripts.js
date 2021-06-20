const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and Pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Upadte play & pause button
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="icon-play-circled2 foo-2x"></i>';
  } else {
    play.innerHTML = '<i class="icon-pause foo-2x"></i>';
  }
}

// Update progress and Timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // get minutes
  let mins = zeroPad(Math.floor(video.currentTime / 60), 2);

  // get seconds
  let secs = zeroPad(Math.floor(video.currentTime % 60), 2);

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Utility
const zeroPad = (num, places) => String(num).padStart(places, '0');

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
