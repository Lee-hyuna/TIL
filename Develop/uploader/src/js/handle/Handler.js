import ui from '../ui'
import { $ } from '../lib/utils'
import HandleTools from './HandleTools'
import HandleFiles from './HandleFiles'
import HandleHistory from './HandlerHistory'
import { MODULE_HISTORY, MODULE_TOOLS, TOOLS_SELECTORS } from '../constants'

// todo 각종 버튼 캐싱 처리

const toggleHistory = (origin, undo, redo) => {
  $('#btnOrigin').el.disabled = origin
  $('#btnUndo').el.disabled = undo
  $('#btnRedo').el.disabled = redo
}

/**
 * tool 버튼 show and hide 처리
 * @param {string} activeTool
 */
function toggleTools(activeTool) {
  for (let key in TOOLS_SELECTORS) {
    $('#' + TOOLS_SELECTORS[key]).el.disabled = activeTool
      ? key !== activeTool
      : false
  }
}

export class Handler {
  constructor(pastel) {
    this.pastel = pastel

    this.render()
    this.subscribeListeners()

    HandleFiles(this.pastel)
    HandleHistory(this.pastel)
    HandleTools(this.pastel)
  }

  render() {
    const $navigation = $('#nav')
    ui.history.render($navigation.el)
    ui.tools.render($navigation.el)
  }

  subscribeListeners() {
    this.pastel.store.subscribe(MODULE_HISTORY, state => {
      toggleHistory(!state.isOriginal, !state.isUndo, !state.isRedo)
    })

    this.pastel.store.subscribe(MODULE_TOOLS, state => {
      toggleTools(state.activeTool)
    })
  }
}

export default Handler
