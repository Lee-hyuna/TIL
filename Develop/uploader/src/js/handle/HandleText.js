import { $, $$ } from '../lib/utils'
import * as ACTION_TYPE from '../constants'

const HandleFiles = pastel => {
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

  const onInputHandler = evt => {
    const target = evt.target
    const clsList = target.classList
    let fontFamily, fontSize, fontColor, fontBgColor, fontBgOpacity
    if (target.id === 'textarea') {
      const minHeight = 30, // 변경 요망
        outerHeight = parseInt(window.getComputedStyle(target).height, 10),
        diff = outerHeight - target.clientHeight
      target.style.height =
        Math.max(minHeight, target.scrollHeight + diff) + 'px'
      // width도 변경 되어야함
      textAreaHidden.innerText = target.value
      const newWidth = textAreaHidden.getBoundingClientRect().width
      target.style.width =
        (target.offsetWidth < newWidth ? newWidth : target.offsetWidth) + 'px'
    } else {
      if (target.id === 'color-picker') {
        fontColor = target.value
      } else if (clsList.contains('select_type01')) {
        fontFamily = target.options[target.selectedIndex].value
      } else if (clsList.contains('select_type02')) {
        fontSize = target.options[target.selectedIndex].value
      } else {
        fontBgColor = 0.8
      }

      pastel.Api.changeFont({
        fontFamily,
        fontSize,
        fontColor,
        fontBgColor,
        fontBgOpacity
      })
    }
  }
  const onClickHandler = evt => {
    const target = evt.target
  }

  const fontStyleSelector = $('.select_type01'),
    fontSizeSelector = $('.select_type02'),
    fontColorInput = $('#color-picker'),
    //fontBgInput = $('#chg-text-bg-ctrs'),
    textArea = $('#textarea'),
    textAreaHidden = $('#textarea-hidden').el

  fontStyleSelector.on('input', onInputHandler)
  fontSizeSelector.on('input', onInputHandler)
  //fontBgInput.on('input', onInputHandler)
  fontColorInput.on('input', onInputHandler)
  textArea.on('input', onInputHandler)
}

export default HandleFiles
