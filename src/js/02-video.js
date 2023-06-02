import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

player.on(
  'timeupdate',
  throttle(function (event) {
    const currentTime = event.seconds;
    const duration = event.duration;

    if (currentTime >= 0 && currentTime < duration) {
      localStorage.setItem('videoplayer-current-time', currentTime.toString());
    }
  }, 1000)
);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime !== null) {
  const startTime = parseFloat(savedTime);
  player.setCurrentTime(startTime);
}

window.addEventListener('beforeunload', function () {
  const currentTime = player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
});
