import EventPriority from './event/EventPriority'
import MessageListener from './MessageListener'
import EvalListener from './listener/listeners/EvalListener'

class Main {
  static init () {
    this.EventPriority = EventPriority
    MessageListener.init()
    const evalListener = new EvalListener('#실행', ['#계산', '#eval'])
    MessageListener.addEventListener(evalListener)
  }
}

export default Main
