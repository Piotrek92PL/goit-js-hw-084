import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

function saveCurrentTime(currentTime) {
  const url = new URL(window.location.href);
  url.searchParams.set('time', currentTime.toString());
  history.replaceState(null, null, url);
}

function loadSavedTime() {
  const url = new URL(window.location.href);
  const currentTime = parseFloat(url.searchParams.get('time'));
  if (!isNaN(currentTime)) {
    player.setCurrentTime(currentTime);
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

loadSavedTime();

window.addEventListener('beforeunload', function () {
  const currentTime = player.getCurrentTime();
  saveCurrentTime(currentTime);
});
