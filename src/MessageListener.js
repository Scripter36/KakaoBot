import EventPriority from './event/EventPriority'
import MessageEvent from './event/MessageEvent'

class MessageListener {
  static init () {
    this.listeners = []
    global.response = (room, message, sender, isGroupChat, replier, image) => {
      for (const listener of this.listeners) listener.listener.execute(new MessageEvent(room, message, sender, isGroupChat, replier, image))
    }
  }

  static addEventListener (listener, eventPriority = EventPriority.NORMAL) {
    this.listeners.push({ listener, eventPriority })
    this.listeners.sort((a, b) => {
      return b.eventPriority - a.eventPriority
    })
  }
}

export default MessageListener
