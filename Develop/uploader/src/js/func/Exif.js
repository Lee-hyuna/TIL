import EXIF from 'exif-js'

class Exif {
  constructor(image) {
    this.image = image
    this.meta = {}
    
    this.getExif(this.image.image)
  }
  
  toggleAttr(target) {
    const infoName = target.className
    const controlInfo = infoName
    
    this.image.exifdata = this.privateMetadata(controlInfo)
    console.log(this.image.exifdata)
    
  }
  
  privateMetadata(info) {
    this.meta[info] = null
    console.log(this.meta[info])
    return this.meta
  }
  
  getExif(img) {
    EXIF.getData(img, () => {
      if(img.exifdata) {
        this.metadata = img.exifdata
        this.setExif()
      }
    })
  }
  
  setExif() {
    this.meta.DateTime = this.metadata.DateTime || null
    this.meta.ISOSpeedRatings = this.metadata.ISOSpeedRatings || null
    this.meta.Model = this.metadata.Model || null
    this.meta.Software = this.metadata.Software || null
    this.meta.ExposureTime = this.metadata.ExposureTime || null
    this.meta.ApertureValue = this.metadata.ApertureValue || null
    this.meta.ExposureBias = this.metadata.ExposureBias || null
    this.meta.FocalLength = this.metadata.FocalLength || null
  }
  
}

export default Exif
