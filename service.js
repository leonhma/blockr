var randomTabId                                                                                             // define variable for global scope

function tryInject(randomTabIdExpected, tabId, path, filename, js_css) {                                    // go up folders 'till file is found
    const file = path.join('/')                                                                             // get path string out of array (['abcd.com', 'www', '$'] -> 'abcd.com/www/$')
    if(!js_css) {                                                                                           // only js is accepted in executeScript
        chrome.scripting.executeScript({                                                                    // insert js
            target: {tabId: tabId},                                                                         // specify tab to insert into
            files: [`deps/${file}/${filename}`]                                                             // specify file to insert ('deps/abcd.com/www/$/script.js')
        }).then((_result) => {                                                                              // if sucessful...
            console.log(`injected ${file}/${filename}`)                                                     // log a message to the service worker console
        }).catch((_err) => {                                                                                // if not sucessful...
            if(randomTabId == randomTabIdExpected && path.length > 1) {                                     // and the tab has not changed and were no at the host...
                tryInject(randomTabIdExpected, tabId, path.slice(0, path.length - 1), filename, js_css)     // trigger recursion (-> ['abcd.com', 'www']...)
            }
        })
    } else {
        chrome.scripting.insertCSS({                                                                         // exactly the same but using insertCSS, sadly executeScript doesn't accept css
            target: {tabId: tabId},
            files: [`deps/${file}/${filename}`]
        }).then(() => {
            console.log(`injected ${file}/${filename}`)
        }).catch((_err) => {
            if(randomTabId == randomTabIdExpected && path.length > 1) {
                tryInject(randomTabIdExpected, tabId, path.slice(0, path.length - 1), filename, js_css)
            }
        })
    }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {                                         // add listener to tab-updates (site changes)   
    if((changeInfo.status == 'loading')) {                                                                   // check if the site has somewhat loaded
        randomTabId = Math.random()                                                                          // generate a new randomTabId
        const re = tab.url.match(/^(.*?):\/\/(.*?)\/(.*?)(?=\/?$|\?|#)/)                                     // regex match current url
        if(!['http', 'https'].includes(re[1])) {return}                                                      // return on unsupported protocol
        var domain = re[2].split('.')                                                                        // restructure regex domain to get an array ('www.abcd.com' -> ['abcd.com', 'www', '$'])
        domain[domain.length-1] = `${domain[domain.length-2]}.${domain[domain.length-1]}`
        domain[domain.length-2] = ''
        domain = domain.reverse()
        domain.push('$')
        const path = domain.concat(re[3].split('/')).filter(item => item)                                    // append path to domain ('www.abcd.com/watch?key=dgydfb', ['abcd.com', 'www', '$'] -> ['abcd.com', 'www', '$', 'watch'])
        console.log(path)                                                                                    // log path
        chrome.scripting.executeScript({                                                                     // insert jquery
            target: {tabId: tabId},                                                                          // specify tab to insert into
            files: ['deps/jquery-3.6.0.slim.min.js']                                                         // specify file to insert
        }).then((_result) => {                                                                               // then...
            tryInject(randomTabId, tabId, path, 'script.js', 0)                                              // try injecting js
        })
        tryInject(randomTabId, tabId, path, 'style.css', 1)                                                  // try inject css
    }
})