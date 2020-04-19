'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor(settings) {
    super(settings)

    this.users = this.get('users') || []
  }

  saveUsers() {
    this.set('users', this.users)

    return this
  }

  getUsers() {
    this.users = this.get('users') || []

    return this
  }

  addUser(user) {
    this.users = [...this.users, user]

    return this.saveUsers()
  }

  deleteUser(userID) {
    this.users = this.users.filter(t => t.id !== userID)

    return this.saveUsers()
  }

  updateUser(user) {
    this.users = this.users.map(t => {
      if (t.id === user.id) {
        t.name = user.name
        t.surname = user.surname
        return t
      }
      return t
    })

    return this.saveUsers()
  }
}

module.exports = DataStore
