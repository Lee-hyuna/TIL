import Frame from '../core/Frame'

const resizeRectSize = 10

class Resize {
  constructor(canvas, frame) {
    this.canvas = canvas
    this.frame = frame
    this.value = {
      x: (this.canvas.clientWidth - this.frame.width) / 2,
      y: (this.canvas.clientHeight - this.frame.height) / 2
    }

    this.editDelimiter = {
      tl: { show: true },
      tr: { show: true },
      bl: { show: true },
      br: { show: true }
    }
    // this.mouseDownListener = this.mouseDownListener.bind(this)
    // this.mouseUpListener = this.mouseUpListener.bind(this)
    // this.mouseMoveListener = this.mouseMoveListener.bind(this)
  }

  resize(width, height) {
    const frame = this.frame
    this.value.x = (this.canvas.clientWidth - width) / 2
    this.value.y = (this.canvas.clientHeight - height) / 2
    let x = this.value.x
    let y = this.value.y
    return new Frame({
      ...frame,
      width,
      height,
      x,
      y
    })
  }

  makePath() {
    const frame = this.frame
    const canvas = this.canvas

    this.changeEditingShape(this.value)
    this.changeCord(this.value, {
      x: this.value.x,
      y: this.value.y,
      x2: this.value.x + frame.width,
      y2: this.value.y,
      x3: this.value.x + frame.width,
      y3: this.value.y + frame.height,
      x4: this.value.x,
      y4: this.value.y + frame.height
    })

    return this.value
  }

  changeEditingShape(shape) {
    // this.pastel.getShapesSize().forEach(el => {
    //   console.log(el)
    //   el.show = true
    //   delete el.isEditing
    // })
    if (typeof shape != 'undefined') {
      shape.isEditing = this.editDelimiter
    }
  }

  changeCord(shape, options) {
    for (let key in options) {
      shape[key] = options[key]
    }

    const editShapes = shape.isEditing,
      shapeX = shape.x,
      shapeY = shape.y,
      shapeX2 = shape.x2,
      shapeY2 = shape.y2,
      shapeX3 = shape.x3,
      shapeY3 = shape.y3,
      shapeX4 = shape.x4,
      shapeY4 = shape.y4,
      shapeWidth = shape.x2 - shape.x,
      shapeHeight = shape.y4 - shape.y,
      resizeRectPadding = resizeRectSize / 2

    shape.path = new Path2D()
    shape.path.moveTo(shapeX, shapeY)
    shape.path.lineTo(shapeX2, shapeY2)
    shape.path.lineTo(shapeX3, shapeY3)
    shape.path.lineTo(shapeX4, shapeY4)
    shape.path.lineTo(shapeX, shapeY)

    editShapes.tl.path = new Path2D()
    editShapes.tl.path.rect(
      shapeX - resizeRectPadding,
      shapeY - resizeRectPadding,
      resizeRectSize,
      resizeRectSize
    )
    editShapes.tr.path = new Path2D()
    editShapes.tr.path.rect(
      shapeX2 - resizeRectPadding,
      shapeY2 - resizeRectPadding,
      resizeRectSize,
      resizeRectSize
    )
    editShapes.br.path = new Path2D()
    editShapes.br.path.rect(
      shapeX3 - resizeRectPadding,
      shapeY3 - resizeRectPadding,
      resizeRectSize,
      resizeRectSize
    )
    editShapes.bl.path = new Path2D()
    editShapes.bl.path.rect(
      shapeX4 - resizeRectPadding,
      shapeY4 - resizeRectPadding,
      resizeRectSize,
      resizeRectSize
    )
  }
}

export default Resize
