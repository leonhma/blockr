**This project is now archived.**

# blockr
A browser extension that blocks ads.

## What is it?
Blockr is a browser extension that blocks ad-serving hosts. It is also able to inject small scripts into specified pages, making for further convenience features (disabling adblock-detectors, skipping ads, etc.)


## How does it work?
This extension relies on small style/script files that are injected when a page is loaded. It also blocks requests to ad-serving hosts using a steadily growing list of blocked domains.

## What permissions does it need?
It only needs very limited permissions:
* Reading browser-history   _<- This is just to know which website you are looking at and execute the appropiate actions. It neither goes back in browser history, nor does it make any of it accessible to anyone else._
* Blocking of contents on all sites you visit    _<- This permission is to allow the extension to do it's work._

## Is it safe?
As seen above, blockr uses a quite limited set of permissions. In addition, it only relies on local dependencies (scripts that are injected are stored locally). This means it doesn't load any (potentially compromised) resources from the web. Also, all the code is commented and open-source, for you to read through and spot bad things.

## There's a missing site?
If there's a site that doesn't look like it should (ads are visible, weird white spaces appear, etc.), you can open an issue by going to the 'issues' tab on the top-left of the github page and selecting 'page request' as your template. Now just fill out the form and we'll see what we can do. If you seem familiar with javascript or css, though, you might want to look into [contributing to this project](/CONTRIBUTING.md).

## Experiencing a bug?
If you can, google your issue. If the issue persists or you think we should know about it, please go to the issue tracker and submit a new bug-report.
