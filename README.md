# Installation (Bash)

```
# Clone the repo
git clone git@gitlab.com:webwerf/webwerf_sites.git "$(wh getdatadir)installedmodules/webwerf_sites"

# Make sure WebHare knows about this module
wh softreset

# Satisfy the module dependencies
wh fixmodules webwerf_sites
```

# Embedded objects

This modules provides the following embedded objects:

## Button

Settings: title + link. Adds an anchor with class "button".

```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/button" />

<applysiteprofile fullpath="mod::webwerf_sites/embeddedobjects/button/button.siteprl" />
```

## Full width image

```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/fullwidthimage" />

<applysiteprofile fullpath="mod::webwerf_sites/embeddedobjects/fullwidthimage/fullwidthimage.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/fullwidthimage/fullwidthimage';
```

## Quote
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/quote" />

<applysiteprofile fullpath="mod::webwerf_sites/embeddedobjects/quote/quote.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/quote/quote';
```

## Text and image columns
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/textimagecols" />

<applysiteprofile fullpath="mod::webwerf_sites/embeddedobjects/textimagecols/textimagecols.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/textimagecols/textimagecols';
@include textimagecols();
```

## Two columns text
```
<allowtype type="http://sites.webwerf.nl/embeddedobjects/twocolumnstext" />

<applysiteprofile fullpath="mod::webwerf_sites/embeddedobjects/twocolumnstext/twocolumnstext.siteprl" />
```

CSS:

```
@import '~@mod-webwerf_sites/embeddedobjects/twocolumnstext/twocolumnstext';
```
