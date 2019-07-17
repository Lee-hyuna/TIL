import { $ } from '../lib/utils'
import ui from '../ui'
import History from '../core/History'
import Frame from '../core/Frame'

class Files {
  constructor(pastel) {
    this.pastel = pastel
    this.images = []
    this.canvasWidth = this.pastel.getCanvas().width
    this.canvasHeight = this.pastel.getCanvas().height

    this.contList = $('.cont_list')
    this.clickHandler = this.clickHandler.bind(this)
    this.contList.on('click', this.clickHandler, true)
    this.currentId
  }
  // // private
  _getImageIndex(imageId) {
    console.log('this.images:', this.images)
    return this.images.findIndex(el => el.id === imageId)
  }

  clickHandler(evt) {
    console.log('clickHandler')
    let el = evt.target
    while (el && el.tagName !== 'LI') {
      el = el.parentNode
    }
    if (el) {
      const ff = this.getImage(el.dataset.imgId)
      console.log('ff: ', ff)
      this._changeContext(this.getImage(el.dataset.imgId))
    }
  }

  addImage(imageFile) {
    const image = new Image()
    if (typeof imageFile === 'string') {
      image.src = imageFile
    } else {
      image.src = window.URL.createObjectURL(imageFile)
    }

    image.onload = () => {
      const x = (this.canvasWidth - image.width) / 2
      const y = (this.canvasHeight - image.height) / 2
      const width = image.width
      const height = image.height
      const frame = new Frame({ image, name: imageFile.name, type: imageFile.type, x, y, width, height })
      this.images.push(frame)
      this._changeContext(frame)
      ui.thumbnail(frame.id, frame.image.src).render(
        this.contList.el.children[0]
      )
      this.pastel.store.dispatch({ type: 'LOADED_IMAGE' })
    }
  }

  _changeContext(frame) {
    this.changeSelected(frame)
    this.pastel.setFrame(frame)
    this.pastel.Api.drawImage()
  }

  getImage(imageId) {
    imageId = imageId || this.currentId
    console.log('imageId:', imageId)
    if (imageId) {
      const idx = this._getImageIndex(imageId)
      console.log('idx: ', idx)
      return this.images[idx]
    }
    return false
  }

  // removeImage(imageId) {
  //   const idx = this._getImageIndex(imageId)
  //   if (typeof idx !== 'undefined') {
  //     this.images.splice(idx, 1)
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  changeSelected(frame) {
    const imgId = frame.id
    History.addFrame(frame)
    this.pastel.CommandManager.subscribe('CHANGE_IMAGE', () => this.pastel.Api.drawImage())

    ;[].slice.call(this.contList.el.children[0].children).forEach(el => {
      imgId && imgId == el.dataset.imgId
        ? el.classList.add('select')
        : el.classList.remove('select')
    })
    this.currentId = imgId
  }
}

export default Files
