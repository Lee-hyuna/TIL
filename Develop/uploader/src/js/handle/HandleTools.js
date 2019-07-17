import HandleFilter from './HandleFilter'
import HandleResize from './HandleResize'
import HandleDrawing from './HandleDrawing'
import HandleRotate from './HandleRotate'
import HandleText from './HandleText'
import HandleSticker from './HandleSticker'
import HandleCrop from './HandleCrop'
import HandleFrame from './HandleFrame'
import { $ } from '../lib/utils'
import * as ACTION_TYPE from '../constants'
import ui from '../ui'
import HandleExif from "./HandleExif"
import toast from '../lib/toast'
import { TOOLS_IDS } from '../constants'

const TOOLS = [
  {
    id: TOOLS_IDS.RESIZE,
    selector: '#btnSize',
    on: (pastel, container) => {
      ui.layerResize().render(container)
      toast('서비스 최대 사이즈는 <em>1024px</em> 입니다')
      HandleResize(pastel)
      pastel.Api.makeResize()
    }
  },
  {
    id: TOOLS_IDS.ROTATE,
    selector: '#btnRotate',
    on: (pastel, container) => {
      console.log('ROTATE')
      ui.layerRotate().render(container)
      HandleRotate(pastel)
      pastel.Api.makeRotate()
    }
  },
  {
    id: TOOLS_IDS.FILTER,
    selector: '#btnEffect',
    on: (pastel, container) => {
      console.log('FILTER')
      ui.layerFilter().render(container)
      HandleFilter(pastel)
      pastel.Api.makeFilter()
    }
  },
  {
    id: TOOLS_IDS.DRAW,
    selector: '#btnDraw',
    on: (pastel, container) => {
      ui.layerDraw().render(container)
      HandleDrawing(pastel)
      pastel.Api.makeDrawing()
    }
  },
  {
    id: TOOLS_IDS.TEXT,
    selector: '#btnText',
    on: (pastel, container) => {
      ui.layerText().render(container)
      HandleText(pastel)
      pastel.Api.makeShape()
      pastel.Api.addText()
    }
  },
  {
    id: TOOLS_IDS.STICKER,
    selector: '#btnSticker',
    on: (pastel, container) => {
      ui.layerSticker().render(container)
      HandleSticker(pastel)
      pastel.Api.makeShape()
    }
  },
  {
    id: TOOLS_IDS.CROP,
    selector: '#btnCrop',
    on: (pastel, container) => {
      HandleCrop(pastel)
      ui.layerCrop().render(container)
      pastel.Api.makeCrop()
    }
  },
  {
    id: TOOLS_IDS.FRAME,
    selector: '#btnFrame',
    on: (pastel, container) => {
      ui.layerFrame().render(container)
      HandleFrame(pastel)
    }
  },
  {
    id: TOOLS_IDS.EXIF,
    selector: '#btnEXIF',
    on: (pastel, container) => {
      HandleExif(pastel)
      ui.layerEXIF().render(container)
      pastel.Api.makeExif()
    }
  }
]

let frameCache = null

const HandleTools = pastel => {
  const $target = $('.layer')
  const $container = $('.layer .contents')
  let defaultX = 0
  let defaultY = 0

  TOOLS.forEach(tool => {
    $(tool.selector).on('click', e => {
      console.log('pastel.getFrame(): ', pastel.getFrame())
      frameCache = pastel.getFrame().getNewIncetance()

      console.log('click', tool.selector)
      const title = $(tool.selector).el.querySelector('.txt').innerText

      $container.removeContent()
      $target.show()
      $('.layer strong').el.innerHTML = title

      pastel.store.dispatch({
        module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
        type: ACTION_TYPE.ACTIVE_TOOL,
        id: tool.id
      })

      tool.on(pastel, $container.el)
    })
  })

  $('.btn_apply').on('click', () => {
    $target.hide()
  })

  $('.btn_cancel').on('click', () => {
    pastel.setFrame(frameCache)
    pastel.Api.drawImage()
    pastel.store.dispatch({
      module: [ACTION_TYPE.MODULE_HISTORY, ACTION_TYPE.MODULE_TOOLS],
      type: ACTION_TYPE.CANCEL_TOOL
    })
    $target.hide()
  })

  $('.cont_list .link_more').on('click', () => {
    if (!$('.cont_list').hasClass('depth')) {
      $('.cont_list').addClass('depth')
    } else {
      $('.cont_list').removeClass('depth')
    }
  })

  const layerBindEvent = () => {
    const $el = $('.layer strong')
    const $document = $(document)

    const onMove = e => {
      const $target = $el.getClosest('.layer')

      let currentLeft = parseInt($target.style.left.replace('px', '')) || 870
      let x = currentLeft + e.offsetX - defaultX
      let currentTop = parseInt($target.style.top.replace('px', '')) || 87
      let y = currentTop + e.offsetY - defaultY

      $target.style.left = x + 'px'
      $target.style.top = y + 'px'
    }

    const stopMove = () => {
      $el.off('mousemove', onMove, false)
      $document.off('mouseout', stopMove, false)
      $document.off('mouseup', stopMove, false)
    }

    $el.on('mousedown', e => {
      defaultX = e.offsetX
      defaultY = e.offsetY

      $el.on('mousemove', onMove, false)
      $document.on('mouseout', stopMove, false)
      $document.on('mouseup', stopMove, false)
    })
  }

  layerBindEvent()
}

export default HandleTools
