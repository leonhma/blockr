function wait(selector, cb) {
  const el = document.querySelector(selector);
  if(el) {
    cb(el)
    return
  }
  window.requestAnimationFrame(() => {
    wait(selector, cb)
  })
}

var observer = new MutationObserver(() => {
  const el = document.querySelector('.ytp-ad-skip-button.ytp-button')
  if(el) {
    el.click();
  }
})

wait('.video-ads', (el) => {
  observer.observe(el, {attributes: true, subtree: true, childList: true})
})
