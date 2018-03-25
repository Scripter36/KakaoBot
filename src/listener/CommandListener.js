import Listener from './Listener'

class CommandListener extends Listener {
  constructor (command, alias) {
    super()
    this.command = command
    this.alias = alias
  }

  execute (event) {
    const data = event.message.split(' ')
    if (data[0] === this.command) {
      data.splice(0, 1)
      event.message = data.join(' ')
      return false
    } else {
      for (const i in this.alias) {
        if (data[0] === this.alias[i]) {
          data.splice(0, 1)
          event.message = data.join(' ')
          return false
        }
      }
      return true
    }
  }
}

export default CommandListener
