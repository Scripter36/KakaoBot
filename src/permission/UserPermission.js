import Permission from './Permission'

class UserPermission extends Permission {
  constructor (availableUsers) {
    super()
    this.availableUsers = availableUsers
  }

  check (user) {
    for (const availableUser of this.availableUsers) {
      if (availableUser instanceof RegExp) {
        if (availableUser.test(user)) return true
      } else if (availableUser === user) {
        return true
      }
    }
    return false
  }
}

export default UserPermission
