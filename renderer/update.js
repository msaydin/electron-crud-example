'use strict'

const { ipcRenderer } = require('electron')

ipcRenderer.on('user-to-update', (event, user) => {
  const ID = document.getElementById('id-input')
  const name = document.getElementById('name-input')
  const surname = document.getElementById('surname-input')

  ID.value = user.id
  name.value = user.name
  surname.value = user.surname
})

document.getElementById('updateUserForm').addEventListener('submit', (evt) => {

  evt.preventDefault()

  const ID = evt.target[0]
  const name = evt.target[1]
  const surname = evt.target[2]

  const user = {
    id: ID.value,
    name: name.value,
    surname: surname.value
  }

  ipcRenderer.send('update-user', user)
})