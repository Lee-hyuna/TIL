import { $, $$ } from '../lib/utils'
import * as ACTION_TYPE from '../constants'

const HandleFilter = pastel => {
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

  const brightness = value => {
    pastel.Api.brightness(parseFloat(value) || 0)
  }
  const contrast = value => {
    pastel.Api.contrast(parseFloat(value) || 0)
  }

  const updateDomHandler = (type, value) => {
    console.log(type, value)
    let dom
    switch (type) {
      case 'brightness':
        dom = $('#filter-brightness .num')
        break
      case 'contrast':
        dom = $('#filter-contrast .num')
        break
    }

    if (dom.el) {
      dom.el.innerText = value
    }
  }

  const inputDoms = $$('.layer input')
  inputDoms.forEach(el => {
    el.addEventListener('input', evt => {
      const target = evt.target,
        value = target.value
      let type
      switch (target.id) {
        case 'chg-bright':
          brightness(value)
          type = 'brightness'
          break
        case 'chg-ctrs':
          contrast(value)
          type = 'contrast'
          break
      }
      updateDomHandler(type, value)
    })
  })

  const btnDoms = $$('.layer .contents button')
  btnDoms.forEach(el => {
    el.addEventListener('click', evt => {
      const $target = $(el)
      const parent = $target.getClosest('.item')
      const input = $('input', parent).el

      input.value =
        Number(input.value) + (target.classList.contains('btn_left') ? -1 : 1)
      input.dispatchEvent(new Event('input')) // ie에서 동작하지 않는 dispatchEvent
    })
  })

  $('.btn_apply').on('click', () => {
    // 저장?
    //pastel.store.dispatch({ type: 'APPLY_EFFECT', payload: 'data' })
  })
}

export default HandleFilter
