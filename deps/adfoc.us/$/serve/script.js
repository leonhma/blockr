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

wait('.skip', (el) => {
    window.location = el.href;
})