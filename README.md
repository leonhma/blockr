# blockr
A browser extension that blocks ads.

## What is it?
Blockr is a browser extension that blocks ad-serving hosts. It is also able to inject small scripts into specified pages, making for further convenience features (disabling adblock-detectors, skipping ads, etc.)


## How does it work?
This extension relies on small style/script files that are placed in a specific folder structure and injected when a page is loaded. They are located under the 'deps' folder together with a list of blocked domains. So, if you put a file called `script.js` into `youtube.com/www/$/watch`, it is automatically injected when `www.youtube.com/watch` is loaded. Also, a wildcard-like logic is used, that when there is no file found, it checks higher folders, such as `youtube.com/www/$`, `youtube.com/www`, ...

## What permissions does it need?
It only needs very limited permissions:
* Reading browser-history   _<- This is just to know which sebsite you are looking at and execute the appropiate actions. It neither goes back in browser history, nor does it make any of it accessible to a third-party._
* Blocking of contents on all sites you visit    _<- This permission is to allow the extension to do it's work._

## Is it safe?
As seen above, blockr uses a quite limited set of permissions. In addition, it only relies on local dependencies (scripts that are injected are stored locally). This means it doesn't load any (potentially compromised) resources from the web. Also, all the code is commented and open-core, for you to read through and spot bad things.

## There's a missing site?
If there's a site that doesn't look like it should (ads are visible, weird white spaces appear, etc.), you can open an issue by going to the 'issues' tab on the top-left of the github page and selecting 'page request' as your template. Now just fill out the form and we'll see what we can do. If you seem familiar with javascript or css, though, you might want to look into contributing to this project.

## Experiencing a bug?
If you can, google your issue. If the issue persists or you think we should know about it, please go to the issue tracker and submit a new bug-report.

## Contributing
If you like this project and want it to grow, contributing is a great way to help it do so. This really is what keeps the project alive and expands its functionality.

### Setting up the extension to work with
First, you'll want to set up the extension locally to tinker with. For this, temporarily disable the already installed blockr-extension. Then just download the code by clicking the green button and clicking on 'Download zip'. Navigate to your downloaded zip and unzip it. In chrome, navigate to `chrome://extensions` and in the top-right, turn on 'Developer mode'. Now, in the top-left click on 'load unpacked extension' and select the 'blockr-main' folder with manifest.json directly inside it.

### Adding a new page to the catalogue
If you find that a page still experiences ads with the extension enabled, adding adding a style/script file will most likely be the solution.
1. Figure out into which folder you need to put your files. All injected files are under `deps/`. Look at the url of the page you want to add. It's important to understand the mechanism that injects the files: First, the path to the page you just loaded is restructured into the format `domain(/subdomain(/subdomain...))/$(/path(/path...))`. So `123.456.abcd.com/xyz/7` gets turned into `abcd.com/456/123/$/xyz/7`. If you want your file to be injected for the entire domain (and all subdomains) of `abcd.com`, put it into `abcd.com`. Similarly, if you want it to be injected just on this specific page, put it under `abcd.com/456/123/$/xyz/7`. If it should only be executed on the domain `abcd.com` (excluding subdomains, including paths), put it under `abcd.com/$`. The `/$` acts as sign for the program to know where the transition from domain to path is, giving you a bit more freedom in the limited world of chrome-extensions.
2. Create the file that should be injected. It has to be called `style.css` for css and `script.js` for javascript, respectively. These scripts are injected (and run) at the load of the page. You can now restyle the page to remove ads. If you thinnk you are done, refresh the locally loaded extension and refresh the page you added a script for. Repeat this until your page looks like it should. If everything looks good, you can go to the github repo and add the file you created. This will create a pullrequest to be reviewed. Please note that drastic changes to the look of the site, keyloggers, nyancats and selfmade light themes won't be accepted.