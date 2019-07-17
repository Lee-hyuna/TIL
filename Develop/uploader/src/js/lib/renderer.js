const str2DOMElement = function(html) {
  const frame = document.createElement('iframe')
  frame.style.display = 'none'
  document.body.appendChild(frame)
  frame.contentDocument.open()
  frame.contentDocument.write(html)
  frame.contentDocument.close()
  const el = frame.contentDocument.body.firstChild
  document.body.removeChild(frame)
  return el
}

class Renderer {
  constructor(markup, container) {
    this.markup = markup
    this.$parent = container
  }

  render($parent) {
    if ($parent) {
      this.$parent = $parent
    }

    const el = str2DOMElement(this.markup)
    if (this.$parent) {
      this.$parent.append(el)
    }

    return el
  }
}

export default { create: (markup, container) => new Renderer(markup, container) }
