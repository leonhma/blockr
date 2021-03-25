function await(selector, cb) {
    const el = document.querySelector(selector);
    if(el) {
       cb(el)
       return
    }
    window.requestAnimationFrame(() => {
        await(selector, cb)
    })
  }

await('.skip', (el) => {
    window.location = el.href;
    setTimeout(() => {
      if(window.location.hostname.endsWith('adfoc.us')) {
        chrome.runtime.sendMessage({action: 'blockrCmd', command: 'tabBack'})
      }
    }, 1500)
})