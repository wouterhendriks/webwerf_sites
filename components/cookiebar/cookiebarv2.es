import './cookiebar.scss';

import WHBase from '@mod-system/js/compat/base';
import * as dompack from 'dompack';
import * as consenthandler from '@mod-publisher/js/analytics/consenthandler.es';
import * as gtm from '@mod-publisher/js/analytics/gtm.es';

let cookieBarNode;

export function init(options) {
  if (!WHBase.config.site.wwcookiename)
    return console.error('no cookie name set');

  // if (location.href.includes('resetcookiebar='))
  //   cookie.remove(WHBase.config.site.wwcookiename);

  // cookieBarNode = dompack.qS('.ww-cookiebar');
  // if (!cookieBarNode)
  //   return;
  gtm.initOnConsent();
  consenthandler.setup(`${WHBase.config.site.wwcookiename}`, () => { showCookieBanner(options); });

  // let acceptButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--accept');
  // if (!acceptButton)
  //   return console.error('cookiebar: no accept button');

  // let declineButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--decline');
  // if (!declineButton)
  //   return console.error('cookiebar: no decline button');

  // let cookieChoice = cookie.read(WHBase.config.site.wwcookiename);

  // let showCookieBar = false;

  // if (!cookieChoice) {
  //   showCookieBar = true;

  //   // setup accept event
  //   acceptButton.addEventListener('click', evt => {
  //     evt.preventDefault();

  //     setCookieValueAccepted(true);
  //   });

  //   // setup decline event
  //   declineButton.addEventListener('click', evt => {
  //     evt.preventDefault();

  //     setCookieValueAccepted(false);
  //   });

  //   // show the cookiebar
  //   toggleCookieBarVisibility(true);
  // }

  // if (options && options.onInit)
  //   options.onInit(showCookieBar);
}

// function setCookieValueAccepted(accept = false) {
//   cookie.write(WHBase.config.site.wwcookiename, (accept === true ? 'accepted' : 'declined'), { duration: 365 } );
//   toggleCookieBarVisibility(false);
// }

function showCookieBanner(options) {
  cookieBarNode = dompack.qS('.ww-cookiebar');
  if (!cookieBarNode)
    return;

  let acceptButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--accept');
  if (!acceptButton)
    return console.error('cookiebar: no accept button');

  let declineButton = dompack.qS(cookieBarNode,'.ww-cookiebar__button--decline');
  if (!declineButton)
    return console.error('cookiebar: no decline button');

  acceptButton.addEventListener("click", () => {
    consenthandler.setConsent(['all']);
    toggleCookieBarVisibility(false);
  });

  declineButton.addEventListener("click", () => {
    consenthandler.setConsent([]);
    toggleCookieBarVisibility(false);
  });

  toggleCookieBarVisibility(true);

  if (options && options.onInit)
    options.onInit(true);
}

function toggleCookieBarVisibility(show = false) {
  dompack.toggleClass(cookieBarNode, 'show', show === true);
  dompack.toggleClass(document.documentElement, 'show-ww-cookiebar', show === true);

  // extra classes may be useful for some sites
  dompack.toggleClass(document.documentElement, 'hide-ww-cookiebar', show === false);
  dompack.toggleClass(cookieBarNode, 'hide', show !== true);
}
