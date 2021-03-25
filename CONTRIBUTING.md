# Contributing
If you like this project and want it to grow, contributing is a great way to help it do so. This really is what keeps the project alive and expands its functionality.

## Setting up the extension to work with
First, you'll want to set up the extension locally to tinker with. For this, temporarily disable the already installed blockr-extension. Then just download the code by clicking the green button and clicking on 'Download zip'. Navigate to your downloaded zip and unzip it. In chrome, navigate to `chrome://extensions` and in the top-right, turn on 'Developer mode'. Now, in the top-left click on 'load unpacked extension' and select the 'blockr-main' folder with manifest.json directly inside it.

## Adding a new page to the catalogue
If you find that a page still experiences ads with the extension enabled, adding adding a style/script file will most likely be the solution.
1. Figure out into which folder you need to put your files. All injected files are under `deps/`. Look at the url of the page you want to add. It's important to understand the mechanism that injects the files: First, the path to the page you just loaded is restructured into the format `domain/(subdomain/(subdomain/...))$/(path/(path/...))`. So `123.456.abcd.com/xyz/7` gets turned into `abcd.com/456/123/$/xyz/7/`. If you want your file to be injected for the entire domain (and all subdomains) of `abcd.com`, put it into `abcd.com/`. Similarly, if you want it to be injected just on this specific page, put it under `abcd.com/456/123/$/xyz/7/`. If it should only be executed on the domain `abcd.com` (excluding subdomains, including paths), put it under `abcd.com/$/`. The `$/` acts as sign for the program to know where the transition from domain to path is, giving you a bit more freedom in the limited world of chrome-extensions.
2. Create the file that should be injected. It has to be called `style.css` for css and `script.js` for javascript, respectively. These scripts are injected (and run) at the load of the page. You can now restyle the page to remove ads (take a look at the [#writing-a-script-to-inject] section). If you think you are done, refresh the locally loaded extension and refresh the page you added a script for. Repeat this until your page looks like it should. If everything looks good, you can go to the github repo and add the file you created. This will create a pull-request to be reviewed. Please note that drastic changes to the look and behavior of the site, keyloggers, nyancats and makeshift light themes won't be accepted.

# Writing a script to inject
Scripts (called `script.js`) are small snippets of code injected into the site. They run in the context of the site, so they have access to the DOM. Additionally, you can use some special commands. These can be accessed by calling `chrome.runtime.sendMessage({action: 'blockrCmd', command: '<command here>'})`.
Available commands are:
Command | Description
--- | ---
`tabClose` | _Closes the current tab_
`tabBack` | _Go back in tab-history one page_
`tabFwd` | _Go forward in tab-history one page_

On success, a message is sent echoing the exact same content, with `result` set to `success`. The choice of 'special' functions is quite limited at the time. If you need another command that integrates with these nicely, just let us know by opening a feature request.
