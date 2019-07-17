import { $ } from '../lib/utils'

const SIZE = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
const MAX_SIZE = 52428800
let totalByte = 0
let capacity

const HandleFiles = pastel => {
  const onChangeHandler = evt => {
    let bytes = evt.target.files[0].size
    let e = Math.floor(Math.log(bytes)/Math.log(1024))
    
    totalByte = totalByte + bytes
    let per = (totalByte/MAX_SIZE) * 100
    
    if(e == '-Infinity') {
      capacity = '0' + SIZE[0]
    } else {
      capacity = (totalByte/Math.pow(1024, Math.floor(e))).toFixed(2) + SIZE[e]
    }

    $('.volume_txt .now').el.innerHTML = capacity
    $('.volume_bar .bar').el.style.width = per + '%'

    if (evt.target.files[0]) {
      pastel.Api.addImage(evt.target.files[0])
      $('.cont_begin').hide()
      $('.cont_photo').show()
    }
  }
  const onClickHandler = evt => {
    const target = evt.target
    switch (target.id) {
      case 'savePhoto':
        const cImg = pastel.getCurrentImage()
        if (cImg) {
          const dataUrl = pastel.getCanvas().toDataURL(cImg.type) // 크기 가져와서 수정해야한다
          const link = document.createElement('a')
          link.download = cImg.name
          link.href = dataUrl
          link.click()
        }
        break
      case 'removeAllPhoto':
        alert('removeAllPhoto')
        break
      case 'uploadPhoto':
        alert('uploadPhoto')
        break
    }
  }
  const addPhotoBtn = $('#addPhoto'),
    fileFormBtn = $('#fileForm'),
    savePhotoBtn = $('#savePhoto'),
    uploadPhotoBtn = $('#uploadPhoto'),
    removeAllPhotoBtn = $('#removeAllPhoto')

  addPhotoBtn.on('change', onChangeHandler)
  fileFormBtn.on('change', onChangeHandler)
  savePhotoBtn.on('click', onClickHandler)
  uploadPhotoBtn.on('click', onClickHandler)
  removeAllPhotoBtn.on('click', onClickHandler)
}

export default HandleFiles
