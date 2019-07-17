import { $ } from '../lib/utils'
import ui from '../ui'
import image from '../../images/lion.png'
import * as ACTION_TYPE from '../constants'

const HandleSticker = pastel => {
  pastel.EventManager.offAll()

  pastel.EventManager.on(
    'click',
    () => {
      pastel.store.dispatch({
        module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
        type: ACTION_TYPE.APPLY_TOOL,
      })
      pastel.Api.mouseDown()
    },
    $('.btn_apply').el
  )

  const layer = $('.layer .inner_contents')
  layer.on('click', evt => {
    const parent = $(evt.target).getClosest('li')
    if (parent) {
      pastel.Api.addSticker()
    }
  })

  ui.stickerItemList(image).render($('.list_frame').el)
}

export default HandleSticker
