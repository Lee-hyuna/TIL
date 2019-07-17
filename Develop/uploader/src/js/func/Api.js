import Filter from './Filter'
import Resize from './Resize'
import Drawing from './Drawing'
import Rotate from './Rotate'
import Shape from './Shape'
import Crop from './Crop'
import Exif from "./Exif"

let filterInstance,
  resizeInstance,
  drawingInstance,
  rotateInstance,
  shapeInstance,
  cropInstance,
  exifInstance

class Api {
  constructor(pastel) {
    this.pastel = pastel
  }

  makeFilter() {
    filterInstance = new Filter(this.pastel.getImageData())
  }
  makeResize() {
    resizeInstance = new Resize(this.pastel.getCanvas(), this.pastel.getFrame())
  }
  makeDrawing() {
    drawingInstance = new Drawing(this.pastel, this.pastel.getFrame())
  }
  makeCrop() {
    cropInstance = new Crop(
      this.pastel,
      this.pastel.getFrame(),
      this.pastel.getCanvas()
    )
    // console.log(cropInstance)
  }
  makeRotate() {
    rotateInstance = new Rotate(this.pastel.getCanvas(), this.pastel.getFrame())
  }
  makeShape(shape) {
    shapeInstance = new Shape(this.pastel)
  }
  makeExif(shape) {
    exifInstance = new Exif(this.pastel.getCurrentImage())
  }

  clear() {
    const canvas = this.pastel.getCanvas()
    let width = canvas.width
    let height = canvas.height
    this.pastel.getContext().clearRect(0, 0, width, height)
  }

  drawImage() {
    const context = this.pastel.getContext()
    const frame = this.pastel.getFrame()
    const width = frame.width
    const height = frame.height
    this.clear()
    context.drawImage(frame.image, frame.x, frame.y, width, height)
    this.drawFrame()
    this.drawDrawing()
    this.drawShape()
  }

  resize(width, height) {
    const frame = resizeInstance.resize(width, height)
    this.pastel.setFrame(frame)
    this.clear()
    this.drawImage()
  }
  
  controlExif(target) {
    exifInstance.toggleAttr(target)
  }

  brightness(value) {
    const context = this.pastel.getContext()
    const frame = this.pastel.getFrame()
    context.putImageData(filterInstance.brightness(value), frame.x, frame.y)
  }
  contrast(value) {
    const context = this.pastel.getContext()
    const frame = this.pastel.getFrame()
    context.putImageData(filterInstance.contrast(value), frame.x, frame.y)
  }
  
  crop(width, height) {
    const frame = cropInstance.cropImage(width, height)
    this.pastel.setFrame(frame)
    this.clear()
    this.pastel.getContext().putImageData(frame.image, frame.x, frame.y)

  }
  onMouseDown(e) {
    cropInstance.onMouseDown(e)
  }
  onMouseUp(e) {
    cropInstance.onMouseUp(e)
  }
  
  drawFrame() {
    const photoFrame = this.pastel.getPhotoFrame()
    if (photoFrame) {
      const context = this.pastel.getContext()
      const frame = this.pastel.getFrame()

      const texture = photoFrame.querySelector('img')
      const pattern = context.createPattern(texture, 'repeat')
      context.strokeStyle = pattern
      context.lineWidth = 10
      context.strokeRect(frame.x, frame.y, frame.width, frame.height)
    }

  }

  drawCropBox(lastPointX, downPointX, lastPointY, downPointY) {
    const context = this.pastel.getContext()
    const hoverBoxSize = 5
    const centerPointX = (lastPointX + downPointX) / 2
    const centerPointY = (lastPointY + downPointY) / 2
    context.fillStyle = '#000000'
    context.lineWidth = 1
    context.fillRect(
      centerPointX - hoverBoxSize,
      downPointY - hoverBoxSize,
      hoverBoxSize * 2,
      hoverBoxSize * 2
    )
    context.fillRect(
      lastPointX - hoverBoxSize,
      centerPointY - hoverBoxSize,
      hoverBoxSize * 2,
      hoverBoxSize * 2
    )
    context.fillRect(
      centerPointX - hoverBoxSize,
      lastPointY - hoverBoxSize,
      hoverBoxSize * 2,
      hoverBoxSize * 2
    )
    context.fillRect(
      downPointX - hoverBoxSize,
      centerPointY - hoverBoxSize,
      hoverBoxSize * 2,
      hoverBoxSize * 2
    )
    this.drawSelectBox(lastPointX, downPointX, lastPointY, downPointY)
  }
  drawSelectBox(lastPointX, downPointX, lastPointY, downPointY) {
    const context = this.pastel.getContext()
    context.strokeStyle = '#000000'
    context.lineWidth = 1
    context.strokeRect(
      downPointX,
      downPointY,
      lastPointX - downPointX,
      lastPointY - downPointY
    )
  }

  rotate(width, height, degrees, horizon, vertical) {
    const canvas = this.pastel.getCanvas()
    const context = this.pastel.getContext()
    const frame = rotateInstance.rotate(width, height)
    this.clear()
    context.save()
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate((degrees * Math.PI) / 180)
    context.scale(horizon, vertical)
    context.drawImage(frame.image, frame.x, frame.y, frame.width, frame.height)
    context.restore()
    this.drawDrawing()
    this.drawShape()
  }

  watchColorPicker(e) {
    drawingInstance.watchColorPicker(e)
  }
  watchSizeRange(e) {
    drawingInstance.watchSizeRange(e)
  }
  watchTransparentRange(e) {
    drawingInstance.watchTransparentRange(e)
  }

  drawing(x, y, lastX, lastY, size, fillColor) {
    const context = this.pastel.getContext()
    context.beginPath()
    context.strokeStyle = fillColor
    context.lineWidth = size
    context.lineJoin = 'round'
    context.moveTo(lastX, lastY)
    context.lineTo(x, y)
    context.closePath()
    context.stroke()
  }

  addImage(imageFile) {
    this.pastel.Files.addImage(imageFile)
  }
  /* 텍스트 관련 */
  addText() {
    this.pastel.addShape(
      shapeInstance.makeShape({
        type: 'text',
        text: '내용을 입력하세요.2'
      })
    )
    this.drawImage()
  }
  changeFont(options) {
    shapeInstance.changeFont(options)
    shapeInstance.calculateTextSize()
    this.drawImage()
  }

  addSticker() {
    this.pastel.addShape(
      shapeInstance.makeShape({
        type: 'sticker',
        appr: '01'
      })
    )
    this.drawImage()
  }

  drawShape() {
    const ctx = this.pastel.getContext()
    this.pastel.getShapes().forEach(shape => {
      if (shape.show) {
        const editShapes = shape.isEditing,
          queue = [],
          shapeType = shape.type
        let text
        ctx.save()
        ctx.beginPath()
        switch (shapeType) {
          case 'text':
            text = shape.text.split('\n')

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fill(shape.path)
            /* 배경 끝 */

            break
          case 'sticker':
            ctx.drawImage(
              shape.sticker,
              shape.x,
              shape.y,
              shape.x2 - shape.x,
              shape.y4 - shape.y
            )
            ctx.lineWidth = 1
            ctx.strokeStyle = '#fff'
            ctx.globalAlpha = editShapes ? 1 : 0
            ctx.stroke(shape.path)
            break
        }
        if (editShapes) {
          ctx.lineWidth = 1
          ctx.fillStyle = 'rgba(0,0,0,0.2)'
          ctx.strokeStyle = '#fff'
          ctx.stroke(editShapes.tl.path)
          ctx.stroke(editShapes.tr.path)
          ctx.stroke(editShapes.br.path)
          ctx.stroke(editShapes.bl.path)
          ctx.fill(editShapes.tl.path)
          ctx.fill(editShapes.tr.path)
          ctx.fill(editShapes.br.path)
          ctx.fill(editShapes.bl.path)
          /* 편집 사각형 끝 */

          /* 삭제 버튼 시작 */
          ctx.lineWidth = 1
          ctx.fillStyle = '#000'
          ctx.fill(editShapes.del.path)
          ctx.stroke(editShapes.del.path)

          ctx.stroke(editShapes.del.subPath)
          ctx.stroke(editShapes.del.subPath2)
          /* 삭제 버튼 끝 */

          /* 회전 버튼 시작
          ctx.lineWidth = 1
          ctx.strokeStyle = '#000'
          ctx.fillStyle = '#fff'

          ctx.stroke(editShapes.rot.subPath)
          ctx.fill(editShapes.rot.path)
          ctx.stroke(editShapes.rot.path)
          회전 버튼 끝 */
        }

        if (typeof text !== 'undefined') {
          ctx.fillStyle = shape.font.fontColor
          ctx.font = `${shape.font.fontSize}px ${shape.font.fontFamily}`
          text.forEach((textEl, idx) => {
            ctx.fillText(textEl, shape.x, shape.y + idx * shape.font.fontSize)
          })
        }

        /* 글씨 끝 */
        ctx.closePath()
        ctx.restore()
      }
    })
  }

  drawDrawing() {
    this.pastel.getDraw().forEach(item =>
      this.pastel.Api.drawing(
        item.x,
        item.y,
        item.lastX,
        item.lastY,
        item.size,
        item.fillColor
      )
    )
  }
  
  mouseDown(mouseX, mouseY, type) {
    console.log('mouseDown', type)
    /*let downType = shapeInstance.mouseDownListener(mouseX, mouseY)
    if (downType) {
      if (downType === 'del') {
        this.pastel.removeShape()
        downType = false
      } else if (downType === 'outside') {
        downType = false
      }
      this.drawImage()
    }*/
    let downType
    switch (type) {
      case 'TEXT':
      case 'STICKER':
        downType = shapeInstance.mouseDownListener(mouseX, mouseY)
        if (downType) {
          if (downType === 'outside' || downType === 'del') {
            downType = false
          }
          this.drawImage()
        }
        break
      case undefined:
        downType = shapeInstance.mouseDownListener(null, null) || false
        this.drawImage()
      
    }
    return downType
  }
  mouseMove(mouseX, mouseY, type, downType) {
    switch (type) {
      case 'TEXT':
      case 'STICKER':
        shapeInstance.mouseMoveListener(mouseX, mouseY, downType)
        this.drawImage()
        break
    }
  }
  dblClick(evt, type) {
    console.log('type ', type)
    switch (type) {
      case 'TEXT':
        shapeInstance.dblClickListener(evt)
        this.drawImage()
        break
    }
  }
}

export default Api
