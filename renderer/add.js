'use strict'

const { ipcRenderer } = require('electron')

document.getElementById('addUserForm').addEventListener('submit', (evt) => {

  evt.preventDefault()

  const name = evt.target[0]
  const surname = evt.target[1]

  const user = {
    id: ID(),
    name: name.value,
    surname: surname.value
  }

  ipcRenderer.send('add-user', user)

  name.value = ''
  surname.value = ''
})

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
}