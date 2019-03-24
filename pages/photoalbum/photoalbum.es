import './photoalbum.scss';

import * as dompack from 'dompack';

import $ from 'jquery';
window.jQuery = $;
require('./lightgallery/js/lightgallery.min.js');
require('./lightgallery/js/lg-video.min.js');
// require('./lightgallery/js/lg-thumbnail.min.js');
require('./lightgallery/js/lg-fullscreen.min.js');
require('./lightgallery/js/lg-zoom.min.js');

dompack.onDomReady(() => {
  if (!document.documentElement.classList.contains('page-nope-photoalbum'))
    return;

  let photoAlbumClass = 'page-nope-photoalbum__items';

  let options = {
    youtubePlayerParams: { modestbranding: 1 },
    thumbnail: true,
    mode: 'lg-soft-zoom',
    videoMaxWidth: '80vw',
  };

  lightGallery($('.page-nope-photoalbum__items').first().get(0), options);
});
