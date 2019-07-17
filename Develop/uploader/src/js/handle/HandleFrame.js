import { $ } from '../lib/utils'
import ui from '../ui'
import Pattern from '../../images/pattern.png'
import { ACTIVE_TOOL, APPLY_TOOL, MODULE_HISTORY } from '../constants'
import * as ACTION_TYPE from '../constants'

const HandleFrame = pastel => {
  const title = 'image'
  const image = Pattern
  const layer = $('.item')
  ui.itemList(image, title).render(layer.el.children[0])

  pastel.EventManager.offAll()

  pastel.EventManager.on(
    'click',
    e => {
      const parent = $(e.target).getClosest('li')
      if (parent) {
        pastel.setPhotoFrame(parent)
        pastel.Api.drawFrame()
      }
    },
    layer.el
  )

  pastel.EventManager.on(
    'click',
    () => {
      pastel.store.dispatch({
        module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
        type: ACTION_TYPE.APPLY_TOOL,
      })
    },
    $('.btn_apply').el
  )
}

export default HandleFrame
