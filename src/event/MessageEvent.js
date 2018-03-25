import Event from './Event'

class MessageEvent extends Event {
  constructor (room, message, sender, isGroupChat, replier, image) {
    super()
    this.room = room
    this.message = message
    this.sender = sender
    this.isGroupChat = isGroupChat
    this.replier = replier
    this.image = image
    this.eventName = 'MessageEvent'
  }

  getRoom () {
    return this.room
  }

  getMessage () {
    return this.message
  }

  getSender () {
    return this.sender
  }

  getIsGroupChat () {
    return this.isGroupChat
  }

  getReplier () {
    return this.replier
  }

  getImage () {
    return this.image
  }
}

export default MessageEvent
