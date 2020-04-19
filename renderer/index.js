'use strict'

const { ipcRenderer } = require('electron')

ipcRenderer.on('users', (event, users) => {

  const userList = document.getElementById('userList')

  const userItems = users.reduce((html, user) => {
    html += `<tr>
                <td class='id'>${user.id}</td>  
                <td class='name'>${user.name}</td>
                <td class='surname'>${user.surname}</td>
                <td><button class='btn delete-btn'>Delete</button></td>
                <td><button class='btn update-btn'>Update</button></td>
            </tr>`

    return html
  }, '')

  userList.innerHTML = userItems

  userList.querySelectorAll('.delete-btn').forEach(item => {
    item.addEventListener('click', deleteUser)
  })

  userList.querySelectorAll('.update-btn').forEach(item => {
    item.addEventListener('click', updateUser)
  })
})

document.getElementById('addUserBtn').addEventListener('click', () => {
  ipcRenderer.send('open-add-user-window')
})

const deleteUser = (e) => {
  const ID = e.target.parentElement.parentElement.firstElementChild.textContent;
  ipcRenderer.send('delete-user', ID)
}

const updateUser = (e) => {
  const user = {
    id: e.target.parentElement.parentElement.querySelector('.id').textContent,
    name: e.target.parentElement.parentElement.querySelector('.name').textContent,
    surname: e.target.parentElement.parentElement.querySelector('.surname').textContent
  }
  ipcRenderer.send('open-update-user-window', user)
}