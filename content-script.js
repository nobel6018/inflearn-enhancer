let timeoutId = null;

function addElement() {
  fetch(chrome.runtime.getURL('/indicator.html'))
    .then((res) => res.text())
    .then((data) => {
      document.querySelector('div.shaka-video-container').insertAdjacentHTML('beforeend', data);
    })
    .catch((err) => console.log(err));
}

if (window === top) {
  window.addEventListener('keyup', keyPressLogic, false);
}

function keyPressLogic(e) {
  if (
    (e.shiftKey && e.keyCode === 190) ||
    (e.shiftKey && e.keyCode === 188) ||
    e.keyCode === 38 ||
    e.keyCode === 40 ||
    e.keyCode === 39 ||
    e.keyCode === 37
  ) {
    preLogic();

    const video = document.getElementsByTagName('video')[0];

    // keypress: >
    if (e.shiftKey && e.keyCode === 190) {
      document.querySelector('div.ytp-bezel-text').textContent = `${video.playbackRate.toString()}x`;

      const volumeUpIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
          <use class='ytp-svg-shadow' xlink:href='#ytp-id-216'></use>
          <path class='ytp-svg-fill' d='M 10,24 18.5,18 10,12 V 24 z M 19,12 V 24 L 27.5,18 19,12 z'
                id='ytp-id-216'></path>
        </svg>`;
      setBezelIcon(volumeUpIcon);
    }

    // keypress: <
    if (e.shiftKey && e.keyCode === 188) {
      document.querySelector('div.ytp-bezel-text').textContent = `${video.playbackRate.toString()}x`;

      const volumeDownIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
          <use class='ytp-svg-shadow' xlink:href='#ytp-id-242'></use>
          <path class='ytp-svg-fill' d='M 17,24 V 12 l -8.5,6 8.5,6 z m .5,-6 8.5,6 V 12 l -8.5,6 z'
                id='ytp-id-242'></path>
        </svg>`;
      setBezelIcon(volumeDownIcon);
    }

    // keypress: ↑
    if (e.keyCode === 38) {
      const volume = Math.round(video.volume * 100);
      document.querySelector('div.ytp-bezel-text').textContent = `${volume}%`;

      const volumeUpIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
          <use class='ytp-svg-shadow' xlink:href='#ytp-id-371'></use>
          <path d='M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z'
                fill='#fff' id='ytp-id-371'></path>
        </svg>`;
      setBezelIcon(volumeUpIcon);
    }

    // keypress: ↓
    if (e.keyCode === 40) {
      const volume = Math.round(video.volume * 100);
      document.querySelector('div.ytp-bezel-text').textContent = `${volume}%`;

      if (video.volume === 0) {
        const muteIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
            <use class='ytp-svg-shadow' xlink:href='#ytp-id-310'></use>
            <path class='ytp-svg-fill'
                  d='m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z'
                  id='ytp-id-310'></path>
            </svg>`;
        setBezelIcon(muteIcon);
      } else {
        const volumeDownIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
            <use class='ytp-svg-shadow' xlink:href='#ytp-id-299'></use>
            <path d='M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z'
                  fill='#fff' id='ytp-id-299'></path>
          </svg>`;
        setBezelIcon(volumeDownIcon);
      }
    }

    // kepress: →
    if (e.keyCode === 39) {
      const element = document.querySelector('div.ytp-doubletap-ui-legacy');
      element.style.display = '';
      element.setAttribute('data-side', 'forward');
    }

    // keypress: ←
    if (e.keyCode === 37) {
      const element = document.querySelector('div.ytp-doubletap-ui-legacy');
      element.style.display = '';
      element.setAttribute('data-side', 'back');
    }

    document.querySelector('div#ytp-bezel-wrapper').classList.remove('ytp-bezel-text-hide');
    postLogic();
  }
}

function setBezelIcon(iconString) {
  document.querySelector('div.ytp-bezel-icon').innerHTML = '';
  document.querySelector('div.ytp-bezel-icon').insertAdjacentHTML('afterbegin', iconString);

  restartBezelAnimation();
}

function restartBezelAnimation() {
  const bezel = document.querySelector('div.ytp-bezel');
  bezel.classList.remove('ytp-bezel');
  void bezel.offsetWidth;
  bezel.classList.add('ytp-bezel');
}

function videoEventListener() {
  const video = document.getElementsByTagName('video')[0];

  video.onplay = (e) => {
    preLogic();
    document.querySelector('div#ytp-bezel-wrapper').classList.add('ytp-bezel-text-hide');

    const playIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
        <use class='ytp-svg-shadow' xlink:href='#ytp-id-106'></use>
        <path class='ytp-svg-fill' d='M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
              id='ytp-id-106'></path>
      </svg>`;
    setBezelIcon(playIcon);
    postLogic();
  };

  video.onpause = (e) => {
    preLogic();
    document.querySelector('div#ytp-bezel-wrapper').classList.add('ytp-bezel-text-hide');

    const pauseIcon = `<svg height='100%' version='1.1' viewBox='0 0 36 36' width='100%'>
        <use class='ytp-svg-shadow' xlink:href='#ytp-id-231'></use>
        <path class='ytp-svg-fill' d='M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z'
              id='ytp-id-231'></path>
      </svg>`;
    setBezelIcon(pauseIcon);
    postLogic();
  };
}

function preLogic() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  document.querySelector('div#ytp-bezel-wrapper').classList.add('ytp-bezel-text-hide');
  document.querySelector('div#ytp-bezel-wrapper').style.display = '';
}

function postLogic() {
  timeoutId = setTimeout(() => {
    document.querySelector('div#ytp-bezel-wrapper').style.display = 'none';
    document.querySelector('div.ytp-doubletap-ui-legacy').style.display = 'none';
  }, 1000);
}

setTimeout(() => {
  console.log('add element');
  addElement();
  console.log('register video event listener');
  videoEventListener();
}, 2000);
