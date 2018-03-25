import Permission from './Permission'

class RoomPermission extends Permission {
  constructor (availableRooms) {
    super()
    this.availableRooms = availableRooms
  }

  check (room) {
    for (const availableRoom of this.availableRooms) {
      if (availableRoom instanceof RegExp) {
        if (availableRoom.test(room)) return true
      } else if (availableRoom === room) {
        return true
      }
    }
    return false
  }
}

export default RoomPermission
