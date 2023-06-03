import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

function saveCurrentTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}

function loadSavedTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    const startTime = parseFloat(savedTime);
    player.setCurrentTime(startTime);
  }
}

player.on(
  'timeupdate',
  throttle(function (event) {
    const currentTime = event.seconds;
    const duration = event.duration;

    if (currentTime >= 0 && currentTime < duration) {
      saveCurrentTime(currentTime);
    }
  }, 1000)
);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('pause', function () {
  const currentTime = player.getCurrentTime();
  saveCurrentTime(currentTime);
});

loadSavedTime();

window.addEventListener('beforeunload', function () {
  const currentTime = player.getCurrentTime();
  saveCurrentTime(currentTime);
});
