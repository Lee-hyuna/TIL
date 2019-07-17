import { $ } from '../lib/utils'
import { ACTIVE_TOOL, APPLY_TOOL, MODULE_HISTORY } from '../constants'
import * as ACTION_TYPE from "../constants"

const HandleCrop = pastel => {
  pastel.EventManager.offAll()
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
  pastel.EventManager.on(
    'mousedown',
    e => {
      pastel.Api.onMouseDown(e)
    },
    pastel.getCanvas()
  )
  
  pastel.EventManager.on(
    'mouseup',
    e => {
      pastel.Api.onMouseUp(e)
    },
    pastel.getCanvas()
  )
  
  
}

export default HandleCrop
