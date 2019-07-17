import { $, $$ } from '../lib/utils'
import History from '../core/History'
import * as ACTION_TYPE from '../constants'

const HandleResize = pastel => {
  let locker = false
  const selector = $('.selector')
  const boxWidth = $('#sizeWidth').el
  const boxHeight = $('#sizeHeight').el
  const originRadio = $('#originSize').el
  const customRadio = $('#customSize').el
  const sectionInp = $('.sec_inp').el
  const changer = $$('input', sectionInp)
  const lock = $('.link_lock')
  const $btnApply = $('.btn_apply')

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
    'click',
    () => {
      History.addFrame(pastel.getFrame())
    },
    $btnApply.el
  )
  selector.on('click', () => {
    locker = true
    checker(originRadio)
  })

  selector.on('input', e => {
    locker = true
    valueChange(Number(e.target.options[e.target.selectedIndex].value))
  })

  changer.forEach(item => {
    item.addEventListener('click', () => {
      checker(customRadio)
    })

    item.addEventListener('input', () => {
      changed(item)
    })
  })

  const entry = () => {
    const imageData = pastel.getFrame()
    if (selector.el.options[selector.el.selectedIndex].text === '원본') {
      selector.el.options[selector.el.selectedIndex].value = imageData.width
    }

    originRadio.checked = true
    locked()
    inpBoxChange(imageData.width, imageData.height)
  }

  const locked = () => {
    lock.on('click', () => {
      if (!lock.hasClass('on')) {
        lock.addClass('on')
        boxHeight.disabled = true
        locker = true
      } else {
        lock.removeClass('on')
        boxHeight.disabled = false
        locker = false
      }
    })
  }

  const checker = el => {
    $$('.sec_radio').forEach(elm => {
      elm.querySelector('input').checked = false
    })

    el.checked = true
  }

  const inpBoxChange = (width, height) => {
    boxWidth.value = width
    boxHeight.value = Math.floor(height)
  }

  const changed = el => {
    const imageData = pastel.getFrame()
    let width = imageData.width
    let height = imageData.height
    el === boxWidth ? (width = el.value) : (height = el.value)

    if (locker) {
      valueChange(width, null)
    } else {
      pastel.Api.resize(width, height)
    }
  }

  const valueChange = (_width, _height) => {
    const imageData = pastel.getFrame()
    let width = imageData.width
    let height = imageData.height
    const ratio = height / width

    width = Number(_width)
    if (_height) {
      height = _height
    } else {
      height = width * ratio
    }

    inpBoxChange(width, height)
    pastel.Api.resize(width, height)
  }

  entry()
}

export default HandleResize
