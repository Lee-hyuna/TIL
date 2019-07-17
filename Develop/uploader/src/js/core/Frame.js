class Frame {
  constructor({
    image,
    name,
    type,
    x,
    y,
    width,
    height,
    shapes,
    draw,
    photoFrame,
  }) {
    this.id = new Date().getTime() + ''
    this.image = image
    this.name = name
    this.type = type
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.shapes = shapes ? shapes.slice() : []
    this.draw = draw ? draw.slice() : []
    this.photoFrame = photoFrame || null
  }

  static copyFrame(frame) {
    return new Frame({
      ...frame
    })
  }

  getNewIncetance() {
    return new Frame({
      ...this
    })
  }

  mergeDraw(drawBuffer) {
    return new Frame({
      image: this.image,
      name: this.name,
      type: this.type,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      shapes: this.shapes,
      draw: this.draw.concat(drawBuffer),
      photoFrame: this.photoFrame,
    })
  }
}

export default Frame
