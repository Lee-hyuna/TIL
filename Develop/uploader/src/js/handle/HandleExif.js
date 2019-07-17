import {$} from "../lib/utils"
import * as ACTION_TYPE from '../constants'

const HandleExif = pastel => {
  const layer = $('.layer').el
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
  pastel.EventManager.on('click', (e) => {
    const target = $(e.target).getClosest('input')
    if(target) {
      bindHandler(target)
      
    }
  }, layer)
  
  const bindHandler = (target) => {
    const targetType = target.getAttribute('type')
    if(targetType === 'radio') {
      if(target.value === 'private') {
        allDisable()
      } else {
        allActive()
      }
    }else if(targetType === 'checkbox') {
      pastel.Api.controlExif(target)
    }else {
      return
    }
  }
  
  const allActive = () => {
    const check_box = layer.querySelector('.check_box')
    const inputs = check_box.querySelectorAll('input[type=checkbox]')
    inputs.forEach(input => {
      input.disabled = false
      input.checked = true
    })
  }
  
  const allDisable = () => {
    const check_box = layer.querySelector('.check_box')
    const inputs = check_box.querySelectorAll('input[type=checkbox]')
    inputs.forEach(input => {
      input.disabled = true
      input.checked = false
    })
  }
  
}



export default HandleExif
