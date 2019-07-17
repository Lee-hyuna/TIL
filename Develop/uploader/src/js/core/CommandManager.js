import History from './History'
import * as ACTION_TYPE from '../constants'

export class CommandManager {
  constructor(pastel) {
    this.pastel = pastel
    this.commands = {}
  }

  subscribe(type, callback) {
    this.commands[type] = callback
  }

  getState() {
    this.pastel.store.dispatch({
      module: [ACTION_TYPE.MODULE_HISTORY],
      type: 'UPDATE_HISTORY',
    })
    const frame = History.get()
    this.pastel.setFrame(frame)
    this.pastel.Api.drawImage()
  }

  undo() {
    if (History.hasBefore()) {
      History.before()



      this.getState()
    }
  }

  redo() {
    if (History.hasNext()) {
      History.next()
      this.getState()
    }
  }
}

export default CommandManager
