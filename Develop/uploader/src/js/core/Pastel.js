/**
 * Pastel - image editor main module
 */
import Api from '../func/Api'
import Files from '../func/Files'
import Handler from '../handle/Handler'
import CommandManager from './CommandManager'
import { $ } from '../lib/utils'
import { createStore, reducer } from './store'
import EventManager from './EventManager'

const createPastel = () => {
  let mouseX, mouseY, downType
  const imageCanvas = $('#canvas') // todo dynamic
  let canvas = imageCanvas
  const context = imageCanvas.el.getContext('2d')
  let frame = null

  // 모든 관리는 Pastel이 한다.
  class Pastel {
    constructor() {
      this.store = createStore(reducer)
      this.Api = new Api(this)
      this.EventManager = new EventManager()
      this.Files = new Files(this)
      this.Handler = new Handler(this) // 툴바를 관리하는 인스턴스
      this.CommandManager = new CommandManager(this)
    }

    getCanvas() {
      return canvas.el
    }
    getContext() {
      return context
    }
    getCurrentImage() {
      return this.Files.getImage()
    }
    getImageData() {
      const frame = this.getFrame()
      return this.getContext().getImageData(
        frame.x,
        frame.y,
        frame.width,
        frame.height
      )
    }
    getPhotoFrame() {
      return frame.photoFrame
    }
    setPhotoFrame(photoFrame) {
      frame.photoFrame = photoFrame
    }
    setFrame(val) {
      frame = val
    }
    getFrame() {
      return frame
    }
    getShapes() {
      return this.getFrame().shapes
    }
    getDraw() {
      return this.getFrame().draw
    }
    addShape(val) {
      this.getFrame().shapes.push(val)
    }
    removeShape(index) {
      if (index) this.getFrame().shapes.splice(index, 1)
      else this.getFrame().shapes.pop()
    }
  }

  const pastel = new Pastel()

  const setExactPosition = evt => {
    // 정확한 포지션을 가져온다.
    const bRect = imageCanvas.el.getBoundingClientRect()
    mouseX = (evt.clientX - bRect.left) * (imageCanvas.el.width / bRect.width)
    mouseY = (evt.clientY - bRect.top) * (imageCanvas.el.height / bRect.height)
  }
  const onMouseDownHandler = evt => {
    console.log('onMouseDownHandler', pastel.store.getState())
    setExactPosition(evt, canvas)
    const activeTool = pastel.store.getState()['activeTool']
    downType = pastel.Api.mouseDown(mouseX, mouseY, activeTool)


    if (downType) {
      pastel.Api.drawImage()
      window.addEventListener('mousemove', onMouseMoveHandler, false)
    }
    canvas.off('mousedown', onMouseDownHandler)
    window.addEventListener('mouseup', onMouseUpHandler, false)

    //code below prevents the mouse down from having an effect on the main browser window:
    if (evt.preventDefault) {
      evt.preventDefault()
    } //standard
    else if (evt.returnValue) {
      evt.returnValue = false
    } //older IE
    return false
  }
  const onMouseMoveHandler = evt => {
    setExactPosition(evt)
    const activeTool = pastel.store.getState()['activeTool']
    switch (activeTool) {
      case 'size':
        break
      case 'TEXT':
      case 'STICKER':
        pastel.Api.mouseMove(mouseX, mouseY, activeTool, downType)
        break
    }
  }

  const onMouseUpHandler = () => {
    const activeTool = pastel.store.getState()['activeTool']
    if (downType === 'rotate') {
      switch (activeTool) {
        case 'size':
          break
        case 'TEXT':
          //rect 정렬..
          break
      }
    }
    canvas.on('mousedown', onMouseDownHandler)
    window.removeEventListener('mouseup', onMouseUpHandler)
    if (downType) {
      downType = false
      window.removeEventListener('mousemove', onMouseMoveHandler)
    }
  }
  const onDblClickHandler = evt => {
    const activeTool = pastel.store.getState()['activeTool']
    console.log('onDblClickHandler', activeTool)
    switch (activeTool) {
      case 'size':
        break
      case 'TEXT':
        pastel.Api.dblClick(evt, activeTool)
        break
    }
  }

  canvas.on('mousedown', onMouseDownHandler)
  canvas.on('dblclick', onDblClickHandler)

  return pastel
}

export { createPastel }
