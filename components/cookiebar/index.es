import './cookiebar.scss';

import * as whintegration from "@mod-system/js/wh/integration";
import * as dompack from 'dompack';
import * as cookie from 'dompack/extra/cookie';

let cookieBarNode;
let debug = dompack.debugflags['ww-cookiebar'];

export function init(options) {
  if (!whintegration.config.site.wwcookiename) {
    return console.error('no cookie name set');
  }

  log('init');

  if (location.href.includes('resetcookiebar='))
    cookie.remove(whintegration.config.site.wwcookiename);

  cookieBarNode = dompack.qS('.ww-cookiebar');
  if (!cookieBarNode)
    return;

  let acceptButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--accept');
  if (!acceptButton)
    return console.error('cookiebar: no accept button');

  let declineButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--decline');
  if (!declineButton)
    return console.error('cookiebar: no decline button');

  let cookieChoice = cookie.read(whintegration.config.site.wwcookiename);
  log('Current cookie value', cookieChoice);

  let showCookieBar = false;

  if (!cookieChoice) {
    showCookieBar = true;

    // setup accept event
    acceptButton.addEventListener('click', evt => {
      evt.preventDefault();
      log('Clicked cookie "accept" button');
      setCookieValueAccepted(true);
    });

    // setup decline event
    declineButton.addEventListener('click', evt => {
      evt.preventDefault();
      log('Clicked cookie "decline" button');
      setCookieValueAccepted(false);
    });

    // show the cookiebar
    toggleCookieBarVisibility(true);
  }

  if (options && options.onInit)
    options.onInit(showCookieBar);
};

function setCookieValueAccepted(accept = false) {
  if (debug)
    log('setCookieValueAccepted?', accept);

  cookie.write(whintegration.config.site.wwcookiename, (accept === true ? 'accepted' : 'declined'), { duration: 365 } );
  toggleCookieBarVisibility(false);
}

function toggleCookieBarVisibility(show = false) {
  log('toggleCookieBarVisibility', show);

  dompack.toggleClass(cookieBarNode, 'show', show === true);
  dompack.toggleClass(document.documentElement, 'show-ww-cookiebar', show === true);

  // extra classes may be useful for some sites
  dompack.toggleClass(document.documentElement, 'hide-ww-cookiebar', show === false);
  dompack.toggleClass(cookieBarNode, 'hide', show !== true);
}

function log() {
  if (!debug)
    return;

  let args = Array.prototype.slice.call(arguments);
  args.unshift('ww-cookiebar' + " -- ");
  console.log.apply(console, args);
}
