import History from '../core/History'
import { $ } from '../lib/utils'
import * as ACTION_TYPE from '../constants'

class Drawing {
  constructor(pastel, frame) {
    this.pastel = pastel
    this.context = this.pastel.getCanvas()
    this.frame = frame
    this.options = {}
    this.options.size = 10
    this.options.color = 'rgba(0,0,0,1.0)'
    this.options.transparent = 1
    this.isDrawing = false
    this.lastX = null
    this.lastY = null
    this.padding = this.options.size / 2
    this.xArea = Number(this.frame.x + this.frame.width - this.padding)
    this.yArea = Number(this.frame.y + this.frame.height - this.padding)
    this.frameX = Number(this.frame.x)
    this.frameY = Number(this.frame.y)

    this.buffer = []

    this.init()
  }

  init() {
    this.bindEvent()
  }

  bindEvent() {
    this.pastel.EventManager.offAll()
    this.pastel.EventManager.on(
      'click',
      () => {
        if (this.buffer.length > 0) {
          const mergedFrame = this.frame.mergeDraw(this.buffer)
          History.addFrame(mergedFrame)
          this.pastel.setFrame(mergedFrame)
          this.clearData()
        }

        this.pastel.store.dispatch({
          module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
          type: ACTION_TYPE.APPLY_TOOL,
        })
      },
      $('.btn_apply').el
    )

    this.pastel.EventManager.on(
      'mousedown',
      e => {
        const x = e.offsetX,
          y = e.offsetY
        const inAreaX = this.frameX + this.padding < x && x < this.xArea
        const inAreaY = this.frameY + this.padding < y && y < this.yArea
        if (inAreaY && inAreaX) {
          this.startDraw(x, y, this.options.color, false)
          this.isDrawing = true
        }
      },
      this.context
    )

    this.pastel.EventManager.on(
      'mousemove',
      e => {
        if (!this.isDrawing) return
        const x = e.offsetX,
          y = e.offsetY
        const inAreaX =
          this.frameX + this.options.size / 2 < x && x < this.xArea
        const inAreaY =
          this.frameY + this.options.size / 2 < y && y < this.yArea
        if (inAreaY && inAreaX) {
          this.drawLine(x, y, this.options.size, this.options.color, true)
        }
      },
      this.context
    )

    this.pastel.EventManager.on(
      'mouseup',
      () => {
        this.stopDraw()
      },
      this.context
    )
  }

  clearData() {
    this.buffer = []
  }

  stopDraw() {
    this.isDrawing = false
  }

  startDraw(x, y, fillColor, isDown) {
    this.drawLine(x, y, fillColor, isDown)
    this.isDrawing = true
  }

  watchColorPicker(e) {
    this.options.color = e.target.value
    this.options.color = this.rgb(
      this.options.color,
      this.options.transparent
    ).css
  }

  rgb(hex, opacity) {
    hex = (hex + '').trim()
    var rgb = null,
      match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/)
    if (!match) {
      return null
    }
    rgb = {}
    hex = match[1]
    if (hex.length === 6) {
      rgb.r = parseInt(hex.substring(0, 2), 16)
      rgb.g = parseInt(hex.substring(2, 4), 16)
      rgb.b = parseInt(hex.substring(4, 6), 16)
    } else if (hex.length === 3) {
      rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16)
      rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16)
      rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16)
    }

    rgb.css = 'rgb' + (opacity ? 'a' : '') + '('
    rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b
    rgb.css += (opacity ? ',' + opacity : '') + ')'

    return rgb
  }

  watchSizeRange(e) {
    this.options.size = e.target.value
  }
  watchTransparentRange(e) {
    const transparent = e.target.value * 0.01
    this.options.transparent = transparent
    this.options.color = this.options.color.replace(
      /[\d\.]+\)$/g,
      transparent + ')'
    )
  }

  drawLine(x, y, size, fillColor, isDown) {
    const lastX = this.lastX,
      lastY = this.lastY

    if (isDown) {
      this.buffer.push({ x, y, lastX, lastY, fillColor })
      this.pastel.Api.drawing(x, y, lastX, lastY, size, fillColor)
    }

    this.lastX = x
    this.lastY = y
  }
}

export default Drawing
