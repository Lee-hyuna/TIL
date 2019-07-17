import { $ } from '../lib/utils'

const HandleHistory = pastel => {
  $('#btnUndo').on('click', () => {
    pastel.CommandManager.undo()
  })

  $('#btnRedo').on('click', () => {
    pastel.CommandManager.redo()
  })
}

export default HandleHistory
