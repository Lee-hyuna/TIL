class _$ {
  constructor(selector, container) {
    // selector가 string 인경우 query selector 사용, string이 아닌 경우 dom element로 파악
    this.el =
      typeof selector === 'string'
        ? container.querySelector(selector)
        : selector
  }

  on(type, callback) {
    this.el.addEventListener(type, callback, false)
  }

  off(type, callback) {
    this.el.removeEventListener(type, callback, false)
  }

  hasClass(clsName) {
    return this.el.classList.contains(clsName)
  }

  addClass(clsName) {
    this.el.classList.add(clsName)
  }

  removeClass(clsName) {
    this.el.classList.remove(clsName)
  }

  // elements의 속성 get
  getAttr(attrName) {
    return this.el.getAttribute(attrName)
  }

  // elements의 속성 set
  setAttr(attrObj) {
    for (const attrName in attrObj) {
      if (Object.prototype.hasOwnProperty.call(attrObj, attrName)) {
        this.el.setAttribute(attrName, attrObj[attrName])
      }
    }
  }

  getClosest(selector) {
    let elm = this.el
    for (; elm && elm !== document; elm = elm.parentNode) {
      if (elm.matches(selector)) return elm
    }
    return null
  }

  append(child) {
    this.el.appendChild(child)
  }

  show() {
    this.el.setAttribute('style', 'display:block')
  }

  hide() {
    this.el.setAttribute('style', 'display:none')
  }

  removeContent() {
    this.el.innerHTML = ''
  }
}

const $ = (selector, container = document) => {
  return new _$(selector, container)
}

const $$ = (selector, container = document) => {
  return container.querySelectorAll(selector)
}

export { $, $$ }
