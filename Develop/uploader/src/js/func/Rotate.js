class Rotate {
  constructor(canvas, frame) {
    this.canvas = canvas
    this.frame = frame
  }
  rotate(width, height) {
    const frame = this.frame

    // let _width = width
    // let _height = height

    // if(Math.abs(degrees) === 90 || Math.abs(degrees) === 270) {
    //   _width = height
    //   _height = width
    // }

    return {
      ...frame,
      width,
      height,
      x: -width / 2,
      y: -height / 2
    }
  }
}

export default Rotate
