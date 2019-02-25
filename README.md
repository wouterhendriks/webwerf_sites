# Installation (Bash)

```
# Clone the repo
git clone git@gitlab.com:webwerf/webwerf_sites.git "$(wh getdatadir)installedmodules/webwerf_sites"

# Make sure WebHare knows about this module
wh softreset

# Satisfy the module dependencies
wh fixmodules webwerf_sites
```

# Folders

## News folder

A news folder containing an (RTD) index file and news detail pages.

News folder namespace: http://sites.webwerf.nl/foldertype/news

### Site profile

You'll need to set your own body renderer and apply site profile.

```
<?xml version="1.0" encoding="UTF-8" ?>
<siteprofile xmlns="http://www.webhare.net/xmlns/publisher/siteprofile">
  <apply>
    <to type="index" parenttype="http://sites.webwerf.nl/foldertype/news" />
    <to type="file" filetype="http://www.webhare.net/xmlns/publisher/richdocumentfile" parenttype="http://sites.webwerf.nl/foldertype/news" />
    <bodyrenderer library="news.whlib" objectname="newspage" />
  </apply>

  <applysiteprofile path="mod::webwerf_sites/pages/news/news.siteprl" />
</siteprofile>
```

### WHLIB

Example for overview:

```
LOADLIB "mod::webwerf_sites/pages/news/news.whlib";

OBJECT newsapi := NEW WWNewsAPI;
newsapi->newsfolder := webdesign->targetsite->OpenByPath("nieuws", [ expect := "folder" ]);

RECORD ARRAY news :=
     SELECT *
          , image_css := webdesign->GetImageCSS(image, [ method := "fit", setwidth := 1920, quality := 90, format := "image/jpeg" ])
       FROM newsapi->GetNewsItems(-1);
```

## Search folder

A (Consilio) search folder containing a search file. Settings can be set from the folder properties.

### Site profile

```
<applysiteprofile path="mod::webwerf_sites/pages/search/search.siteprl" />
```

# Embedded objects

This modules provides the following embedded objects:

## Button

Settings: title + link. Adds an anchor with class "button".

```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/button" />

<applysiteprofile path="mod::webwerf_sites/embeddedobjects/button/button.siteprl" />
```

## Full width image

```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/fullwidthimage" />

<applysiteprofile path="mod::webwerf_sites/embeddedobjects/fullwidthimage/fullwidthimage.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/fullwidthimage/fullwidthimage';
```

## Quote
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/quote" />

<applysiteprofile path="mod::webwerf_sites/embeddedobjects/quote/quote.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/quote/quote';
```

## Text and image columns
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/textimagecols" />

<applysiteprofile path="mod::webwerf_sites/embeddedobjects/textimagecols/textimagecols.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/textimagecols/textimagecols';
@include textimagecols();
```

## Two columns text
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/twocolumnstext" />

<applysiteprofile path="mod::webwerf_sites/embeddedobjects/twocolumnstext/twocolumnstext.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/twocolumnstext/twocolumnstext';
@include twocolumnstext(35px); // margin-in-between
```

# Cookie bar

## Example JavaScript (ES)

In this example, we're using a fixed header and want to set the height of the container on init.


```
import * as dompack from 'dompack';
import * as cookieBar from '@mod-webwerf_sites/components/cookiebar';

dompack.onDomReady(() => {
  cookieBar.init({ onInit: onCookieBarInit });
});

function onCookieBarInit(showing = false) {
  if (!showing)
    return;

  window.addEventListener('resize', onResizeWithCookieBar);
  onResizeWithCookieBar();
}

function onResizeWithCookieBar() {
  let cookieBar = dompack.qS('.ww-cookiebar');

  if (cookieBar.classList.contains('show')) {
    let height = dompack.qS('.ww-cookiebar__container').getBoundingClientRect().height;
    cookieBar.style.height = `${height}px`;
  }
}
```

## Siteprofile

```
  <applysiteprofile path="mod::webwerf_sites/components/cookiebar/cookiebar.siteprl" />
```

## WHLIB

In the main pageconfig:

```
LOADLIB "mod::webwerf_sites/components/cookiebar/cookiebar.whlib";

PUBLIC OBJECTTYPE ... EXTEND WebDesignBase
<
  UPDATE PUBLIC RECORD FUNCTION GetPageConfig()
  {
    ...

    PrepareWebwerfCookieBar(this);

    RETURN [ ...
           , cookiebar := PTR RunWebwerfCookieBar(this)
           ];
```

## Witty

In the main witty (for example at the end of `[component htmlbody]`):

```
[cookiebar]
```

## SCSS

For normal sites, the CSS should be fine for the most part. But if you have an absolute or fixed positioned header, the following can be used:

```
.ww-cookiebar {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: height .5s;
  z-index: 20000;

  // initialize as a visible block with 0 height; height is set through JS
  display: block !important;
  overflow: hidden;
  height: 0;

  &.hide {
    height: 0 !important;
  }
}
```
