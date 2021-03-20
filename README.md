# blockr
## What is it?
Blockr is a browser extension that blocks ad-serving hosts. It is also able to inject small scripts into specified pages, making for further convenience functions (disabling adblock-detectors, skipping ads, etc.)

## What permissions does it need?
It only needs very limited permissions:
* Reading browser-history   _<- This is just to know which sebsite you are looking at and execute the appropiate actions. It neither goes back in browser history, nor does it make any of it accessible to a third-party._
* Blocking of contents on all sites you visit    _<- This permission is to allow the extension to do it's work._

## Is it safe?
**TL;DR** Yes, it is.

Blockr uses a very limited set of permissions. In addition, it only relies on local dependencies (scripts that are injected are stored locally). This means it doesn't load any (potentially compromised) resources from the web. Also, all the code is commented and open-core, for you to read through and spot bad things.
