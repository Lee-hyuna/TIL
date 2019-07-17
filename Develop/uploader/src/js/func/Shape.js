import { $, setAttr } from '../lib/utils'
import ui from '../ui'
import '../../css/shape.css'

import lion from '../../images/lion.png'
const testSticker = new Image()
testSticker.src = lion

const delRectSize = 30
const resizeRectSize = 15
const rotCircleSize = 10
const fontValue = {
  fontSize: 30,
  fontColor: '#ffffff',
  fontFamily: 'Arial'
}

let shape
const getShape = () => {
  return shape
}
const setShape = value => {
  shape = value
}

class Shape {
  constructor(pastel, shape) {
    this.pastel = pastel
    this.editDelimiter = {
      tl: {
        show: true
      },
      tr: {
        show: true
      },
      br: {
        show: true
      },
      bl: {
        show: true
      },
      del: {
        show: true
      },
      rot: {
        show: true
      }
    }

    this.mouseDownListener = this.mouseDownListener.bind(this)
    this.mouseUpListener = this.mouseUpListener.bind(this)
    this.mouseMoveListener = this.mouseMoveListener.bind(this)
    this.dblClickListener = this.dblClickListener.bind(this)
    //this.canvas.addEventListener("mousedown", this.mouseDownListener, false)
    //this.canvas.addEventListener("dblclick", this.dblClickListener, false)

    /* font 관련 */
  }
  makeShape(option) {
    const shape = {
      ...option,
      show: true,
      id: new Date().getTime()
    }

    const canvas = this.pastel.getCanvas()

    let width, height, x, y
    switch (shape.type) {
      case 'text':
        shape.font = { ...fontValue }
        this.calculateTextSize(shape)
        width = shape.minWidth
        height = shape.minHeight
        break
      case 'sticker':
        width = 181.81
        height = 300
        shape.sticker = testSticker
        break
    }
    x = (canvas.width - width) / 2
    y = (canvas.height - height) / 2
    this.changeEditingShape(shape)
    this.changeCord(shape, {
      x,
      y,
      x2: x + width,
      y2: y,
      x3: x + width,
      y3: y + height,
      x4: x,
      y4: y + height
      //width,
      //height
    })

    setShape(shape)

    return shape
  }

  findShapeByXY(mouseX, mouseY) {
    const shapes = this.pastel.getShapes()
    let len = shapes.length - 1

    // for 문을 돌면서 선택한 shape를 찾는다
    for (; len >= 0; --len) {
      if (this.hitTest(shapes[len], mouseX, mouseY)) {
        return shapes[len]
      }
    }
    return false
  }
  getShapeIndexById(shapeId) {
    const shapes = this.pastel.getShapes()
    return shapes.findIndex(el => el.id == shapeId)
  }
  findEditDelimiterShape(mouseX, mouseY) {
    for (let key in this.editDelimiter) {
      if (this.hitTest(this.editDelimiter[key], mouseX, mouseY)) {
        return key
      }
    }
    return false
  }
  dblClickListener(evt) {
    const shape = getShape()
    const canvas = this.pastel.getCanvas()
    if (shape) {
      if (shape['type'] == 'text') {
        shape.show = false
        const textarea = $('#textarea').el,
          textareaHidden = $('#textarea-hidden').el

        textarea.style.left = shape.x + 'px'
        textarea.style.top = canvas.getBoundingClientRect().top + shape.y + 'px'
        textarea.style.width = shape.x2 - shape.x + 'px'
        textarea.style.height = shape.y4 - shape.y + 'px'
        textarea.style.fontSize = fontValue.fontSize + 'px'
        textarea.style.lineHeight = textarea.style.fontSize
        textarea.style.color = fontValue.fontColor
        textarea.style.fontFamily = fontValue.fontFamily
        textareaHidden.style.fontFamily = fontValue.fontFamily
        textareaHidden.style.fontSize = fontValue.fontSize + 'px'
        textareaHidden.style.lineHeight = textarea.style.fontSize
        textarea.value = shape.text
        $('#textarea').setAttr({ 'data-show': 'on' })
        textarea.focus()
        textarea.select()
      }
    }
  }
  mouseDownListener(mouseX, mouseY) {
    let downType = false
    const editDlmId = this.findEditDelimiterShape(mouseX, mouseY),
      findedShape = getShape()
    if (findedShape && findedShape.show && editDlmId) {
      // shape가 show 상태였을때만
      downType = editDlmId
      if(downType === 'del') {
        this.pastel.removeShape(this.getShapeIndexById(shape.id))
      }
    } else {
      const findedShape = this.findShapeByXY(mouseX, mouseY)
      if (!!findedShape != false) {
        setShape(findedShape)
        downType = 'click'
        this.changeEditingShape(findedShape)
        this.changeCord(findedShape, {})

        //We will pay attention to the point on the object where the mouse is "holding" the object:
        this.dragHoldX = mouseX - findedShape.x
        this.dragHoldY = mouseY - findedShape.y
      } else {
        const findedShape = getShape()
        downType = 'outside'
        if (findedShape && findedShape.type === 'text') {
          const textarea = $('#textarea')
          if (textarea.el.value) {
            findedShape.text = textarea.el.value
            this.calculateTextSize()
          }
          textarea.el.value = ''
          textarea.setAttr({ 'data-show': 'off' })
        }
        this.changeEditingShape()
        setShape()
      }
    }
    return downType
  }
  mouseMoveListener(mouseX, mouseY, downType) {
    const canvas = this.pastel.getCanvas()
    const shape = getShape()
    if (shape) {
      let posX, posY, width, height, x, y

      const minX = minX //minX 정해야..
      const maxX = canvas.width - (shape.x2 - shape.x) // width
      const minY = minY
      const maxY = canvas.height - (shape.y4 - shape.y) // height

      if (downType === 'rotate') {
        shape.radians = Math.atan2(
          this.mouseY - (shape.y + shape.height / 2),
          this.mouseX - (shape.x + shape.width / 2)
        )
        if (shape.radians < 0) {
          shape.radians += 2 * Math.PI
        }
      } else {
        /*if (shape.radians) {
          const a = this.transformation(shape.x+shape.width/2, shape.y+shape.height/2, this.mouseX, this.mouseY, -shape.radians)
          //console.log(a)
          this.mouseX = a.x
          this.mouseY = a.y
        }*/
        // 대각선 점은 움직이면 안된다.
        // 즉 tl인 경우 x + width, y+height는 고정이다.

        switch (downType) {
          case 'tl': {
            mouseX =
              mouseX + shape.minWidth > shape.x2
                ? shape.x2 - shape.minWidth
                : mouseX
            mouseY =
              mouseY + shape.minHeight > shape.y3
                ? shape.y3 - shape.minHeight
                : mouseY
            //width = shape.minWidth > shape.x2 - mouseX ? shape.minWidth : shape.x2 - mouseX
            //height = shape.minHeight > shape.y3 - mouseY ? shape.minHeight : shape.y3 - mouseY
            // x + width가 x2보다 크면 x2- width
            this.changeCord(shape, {
              x: mouseX,
              y: mouseY,
              y2: mouseY,
              //width,
              //height,
              x4: mouseX,
              y4: shape.y3
            })
            break
          }
          case 'tr': {
            console.log(shape.minWidth, mouseX - shape.x)
            //width = shape.minWidth > mouseX - shape.x ? shape.minWidth : mouseX - shape.x
            //height = shape.minHeight > shape.y4 - mouseY ? shape.minHeight : shape.y4 - mouseY
            mouseX =
              mouseX - shape.minWidth < shape.x
                ? shape.x + shape.minWidth
                : mouseX
            mouseY =
              mouseY + shape.minHeight > shape.y3
                ? shape.y3 - shape.minHeight
                : mouseY
            this.changeCord(shape, {
              y: mouseY,
              //width,
              //height,
              x2: mouseX,
              y2: mouseY,
              x3: mouseX
            })
            break
          }
          case 'br': {
            //width = shape.minWidth > mouseX - shape.x4 ? shape.minWidth : mouseX - shape.x4
            //height = shape.minHeight > mouseY - shape.y2 ? shape.minHeight : mouseY - shape.y2
            mouseX =
              mouseX - shape.minWidth < shape.x
                ? shape.x + shape.minWidth
                : mouseX
            mouseY =
              mouseY < shape.y + shape.minHeight
                ? shape.y + shape.minHeight
                : mouseY
            this.changeCord(shape, {
              //width,
              //height,
              x2: mouseX,
              x3: mouseX,
              y3: mouseY,
              y4: mouseY
            })
            break
          }
          case 'bl': {
            //width = shape.minWidth > shape.x2 - mouseX ? shape.minWidth : shape.x2 - mouseX
            //height = shape.minHeight > mouseY - shape.y ? shape.minHeight : mouseY - shape.y
            mouseX =
              mouseX + shape.minWidth > shape.x2
                ? shape.x2 - shape.minWidth
                : mouseX
            mouseY =
              mouseY < shape.y + shape.minHeight
                ? shape.y + shape.minHeight
                : mouseY
            this.changeCord(shape, {
              x: mouseX,
              //width,
              //height,
              y3: mouseY,
              x4: mouseX,
              y4: mouseY
            })
            break
          }

          case 'click': {
            posX = mouseX - this.dragHoldX
            posX = posX < minX ? minX : posX > maxX ? maxX : posX
            posY = mouseY - this.dragHoldY
            posY = posY < minY ? minY : posY > maxY ? maxY : posY
            width = shape.x2 - shape.x
            height = shape.y4 - shape.y
            this.changeCord(shape, {
              x: posX,
              y: posY,
              x2: posX + width,
              y2: posY,
              x3: posX + width,
              y3: posY + height,
              x4: posX,
              y4: posY + height
            })
            break
          }
        }
      }
    }

    //clamp x and y positions to prevent object from dragging outside of canvas

    //console.log(this.shapes)
    //this.drawScreen() // 새로 다시 그리는 것이다
  }
  mouseUpListener() {}
  hitTest(shape, mX, mY) {
    return shape.path
      ? this.pastel.getContext().isPointInPath(shape.path, mX, mY)
      : false
  }
  transformation(cx, cy, px, py, rad) {
    // cx, cy : 중심점 px,py : 원래 좌표,rad 각도
    rad = rad || 0
    //rad = rad * 180 / Math.PI //90도 (90 * Math.PI/180)
    var x = (px - cx) * Math.cos(rad) - (py - cy) * Math.sin(rad) + cx
    var y = (px - cx) * Math.sin(rad) + (py - cy) * Math.cos(rad) + cy

    return { x: x, y: y }
  }

  resizeRect(shape, newX, newY, newW, newH) {
    if (newX != null) {
      shape.x = newX
    }
    if (newY != null) {
      shape.y = newY
    }
    if (newW != null && shape.minWidth < newW) {
      shape.width = newW
    }
    if (newH != null && shape.minHeight < newH) {
      shape.height = newH
    }
  }

  orderEditRect(shape) {
    // 그릴때마다 갱신해줘야한다.
    let highestIndex = 2
    if (shape.radians) {
      const tl = this.transformation(
        shape.x + shape.width / 2,
        shape.y + shape.height / 2,
        shape.x,
        shape.y,
        shape.radians
      )
      const tr = this.transformation(
        shape.x + shape.width / 2,
        shape.y + shape.height / 2,
        shape.x2,
        shape.y2,
        shape.radians
      )
      const br = this.transformation(
        shape.x + shape.width / 2,
        shape.y + shape.height / 2,
        shape.x3,
        shape.y3,
        shape.radians
      )
      const bl = this.transformation(
        shape.x + shape.width / 2,
        shape.y + shape.height / 2,
        shape.x4,
        shape.y4,
        shape.radians
      )
      const totArr = [tl.x + tl.y, tr.x + tr.y, br.x + br.y, bl.x + bl.y]
      const max = Math.max(totArr[0], totArr[1], totArr[2], totArr[3])
      highestIndex = totArr.findIndex(el => el === max)
    }

    switch (highestIndex) {
      case 0:
        this.editDelimiter.shapes[0].id = 'br'
        this.editDelimiter.shapes[1].id = 'bl'
        this.editDelimiter.shapes[2].id = 'tl'
        this.editDelimiter.shapes[3].id = 'tr'
        break
      case 1:
        this.editDelimiter.shapes[0].id = 'tr'
        this.editDelimiter.shapes[1].id = 'br'
        this.editDelimiter.shapes[2].id = 'bl'
        this.editDelimiter.shapes[3].id = 'tl'
        break
      case 2: // 초기 값
        this.editDelimiter.shapes[0].id = 'tl'
        this.editDelimiter.shapes[1].id = 'tr'
        this.editDelimiter.shapes[2].id = 'br'
        this.editDelimiter.shapes[3].id = 'bl'
        break
      case 3:
        this.editDelimiter.shapes[0].id = 'br'
        this.editDelimiter.shapes[1].id = 'tr'
        this.editDelimiter.shapes[2].id = 'tl'
        this.editDelimiter.shapes[3].id = 'bl'
        break
    }
  }
  changeEditingShape(shape) {
    this.pastel.getShapes().forEach(el => {
      el.show = true
      delete el.isEditing
    })
    if (typeof shape !== 'undefined') {
      // 편집할 shape에 delimeter를 적용
      shape.isEditing = this.editDelimiter

      if (shape.type === 'text') {
        //actvtToool 비교
        //ui.layerText().render(container)
        //HandleText(pastel)
        //수정 후 편집창 띄우기
        $('.select_type01').el.value = shape.font.fontFamily
        $('.select_type02').el.value = shape.font.fontSize
        $('#color-picker').el.value = shape.font.fontColor
        $('.layer').show()
      } else {

      }


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
      resizeRectPadding = resizeRectSize / 2 // 크기 조절 사각형의 패딩 값

    switch (shape.type) {
      case 'text':
      case 'sticker':
        shape.path = new Path2D()
        shape.path.moveTo(shapeX, shapeY)
        shape.path.lineTo(shapeX2, shapeY2)
        shape.path.lineTo(shapeX3, shapeY3)
        shape.path.lineTo(shapeX4, shapeY4)
        shape.path.lineTo(shapeX, shapeY)
        break
    }

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

    editShapes.del.path = new Path2D()
    editShapes.del.path.rect(
      shapeX + shapeWidth - resizeRectSize - resizeRectPadding,
      shapeY - delRectSize - resizeRectSize,
      delRectSize,
      delRectSize
    )

    editShapes.del.subPath = new Path2D()
    editShapes.del.subPath.moveTo(
      shapeX + shapeWidth - resizeRectSize - resizeRectPadding + 5,
      shapeY - delRectSize - resizeRectSize + 5
    )
    editShapes.del.subPath.lineTo(
      shapeX + shapeWidth - resizeRectSize - resizeRectPadding + 25,
      shapeY2 - 20
    )

    editShapes.del.subPath2 = new Path2D()
    editShapes.del.subPath2.moveTo(
      shapeX + shapeWidth - resizeRectSize - resizeRectPadding + 25,
      shapeY2 - delRectSize - resizeRectSize + 5
    )
    editShapes.del.subPath2.lineTo(
      shapeX + shapeWidth - resizeRectSize - resizeRectPadding + 5,
      shapeY2 - 20
    )

    editShapes.rot.path = new Path2D()
    editShapes.rot.path.arc(
      shapeX + shapeWidth / 2,
      shapeY - 30,
      rotCircleSize,
      0,
      2 * Math.PI,
      false
    )

    editShapes.rot.subPath = new Path2D()
    editShapes.rot.subPath.moveTo(shapeX + shapeWidth / 2, shapeY - 30)
    editShapes.rot.subPath.lineTo(shapeX + shapeWidth / 2, shapeY - 1)
  }
  calculateTextSize(shape) {
    const ctx = this.pastel.getContext(),
      targetShape = shape || getShape()
    if (targetShape) {
      const text = targetShape.text.split('\n')
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'
      ctx.font = `${targetShape.font.fontSize}px ${targetShape.font.fontFamily}`
      targetShape.minWidth = 0
      targetShape.minHeight = 0
      text.forEach(textEl => {
        targetShape.minWidth = Math.max(
          targetShape.minWidth,
          ctx.measureText(textEl).width
        )
        targetShape.minHeight += parseInt(targetShape.font.fontSize, 10)
      })

      if (typeof shape == 'undefined') {
        // Api에서 호출 했을 경우
        const x2 =
            targetShape.x2 < targetShape.x + targetShape.minWidth
              ? targetShape.x + targetShape.minWidth
              : targetShape.x2,
          y4 =
            targetShape.y4 < targetShape.y + targetShape.minHeight
              ? targetShape.y + targetShape.minHeight
              : targetShape.y4
        this.changeCord(targetShape, {
          x2,
          x3: x2,
          y3: y4,
          y4
        })
      }
    }
  }
  changeFont(options) {
    const shape = getShape()
    console.log(shape)
    if (shape) {
      console.log(shape, options)
      for (let key in options) {
        if (typeof options[key] != 'undefined') {
          shape.font[key] = options[key]
        }
      }
    }
  }
  /*getCurrentShape() {
    const shapes = this.pastel.getShapes()
    return this.shape || shapes[shapes.length-1]
  }*/
}

export default Shape
