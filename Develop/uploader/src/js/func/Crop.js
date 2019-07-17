import {$} from "../lib/utils"
import * as ACTION_TYPE from '../constants'
import Frame from '../core/Frame'

class Crop {
  constructor(pastel, frame, canvas) {
    this.pastel = pastel
    this.frame = frame
    this.canvas = canvas
    this.click = false
    this.downPointX = 0
    this.downPointY = 0
    this.lastPointX = 0
    this.lastPointY = 0

    this.init()
  }

  init() {
    this.bindEvent()
    this.setString(this.frame.width, this.frame.height)
  }

  bindEvent() {

  }

  onMouseDown(e) {
    const x = e.offsetX,
      y = e.offsetY
    this.click = true
    this.pastel.EventManager.on(
      'mousemove',
      e => {
        this.onMouseMove(e)
      },
      this.canvas
    )
    this.lastPointX = x
    this.lastPointY = y
    this.downPointX = x
    this.downPointY = y
  }
  onMouseUp(e) {
    this.click = false
    const width = this.lastPointX - this.downPointX
    const height = this.lastPointY - this.downPointY
    const layer = $('.layer').el

    this.pastel.EventManager.on('click', () =>{
      this.pastel.Api.crop(width, height)
    }, layer)

  }
  onMouseMove(e) {
    e.preventDefault()
    const x = e.offsetX,
      y = e.offsetY
    if (this.click) {
      this.lastPointX = x
      this.lastPointY = y
      this.reDrawCanvas()

      this.setString(this.lastPointX - this.downPointX, this.lastPointY - this.downPointY)
    }
  }

  setString(width, height) {
    $('.croppedWidth').el.innerText = width
    $('.croppedHeight').el.innerText = height
  }

  cropImage(width, height) {
    this.pastel.Api.drawImage()
    const imgData = this.pastel.getContext().getImageData(this.downPointX,this.downPointY, width, height)

    return new Frame({
      ...this.frame,
      image: imgData,
      x: (this.canvas.clientWidth - width) / 2,
      y: (this.canvas.clientHeight - height) / 2,
      width,
      height
    })
  }

  reDrawCanvas() {
    this.pastel.Api.drawImage()
    this.pastel.Api.drawSelectBox(
      this.lastPointX,
      this.downPointX,
      this.lastPointY,
      this.downPointY
    )
    this.pastel.Api.drawCropBox(
      this.lastPointX,
      this.downPointX,
      this.lastPointY,
      this.downPointY
    )
  }
}

export default Crop
