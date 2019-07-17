class Filter {
  constructor(imageData) {
    this.imageData = imageData
    this.state = {
      brightness: 0,
      contrast: 0
    }
  }

  filtering() {
    const imageData = new ImageData(
      new Uint8ClampedArray(this.imageData.data),
      this.imageData.width,
      this.imageData.height
    )

    let px = imageData.data
    const length = px.length

    // brightness
    if (this.state.brightness !== 0) {
      const value = this.state.brightness
      for (let i = 0; i < length; i += 4) {
        //R G B values. 0-255

        px[i] += value
        px[i + 1] += value
        px[i + 2] += value
      }
    }

    // contrast
    if (this.state.contrast !== 0) {
      const value = this.state.contrast
      for (let i = 0; i < length; i += 4) {
        px[i] += ((255 - px[i]) * value) / 255 //RED
        px[i + 1] += ((255 - px[i + 1]) * value) / 255 //GREEN
        px[i + 2] += ((255 - px[i + 2]) * value) / 255 //BLUE
      }
    }

    return imageData
  }

  brightness(value) {
    this.state.brightness = value
    return this.filtering()
  }

  contrast(value) {
    this.state.contrast = value
    return this.filtering()
  }
}

export default Filter
