'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./Window')
const DataStore = require('./DataStore')

require('electron-reload')(__dirname)

const usersData = new DataStore({ name: 'Users Main' })

function main() {
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html'),
    width: 600,
    height: 600,
  })

  let addUserWin
  let updatedUserWin

  mainWindow.once('show', () => {
    mainWindow.webContents.send('users', usersData.users)
  })

  ipcMain.on('open-add-user-window', () => {
    if (!addUserWin) {
      addUserWin = new Window({
        file: path.join('renderer', 'add.html'),
        width: 400,
        height: 400,
        parent: mainWindow
      })

      addUserWin.on('closed', () => {
        addUserWin = null
      })
    }
  })

  ipcMain.on('open-update-user-window', (event, user) => {
    if (!updatedUserWin) {
      updatedUserWin = new Window({
        file: path.join('renderer', 'update.html'),
        width: 400,
        height: 400,
        parent: mainWindow
      })

      updatedUserWin.once('show', () => {
        updatedUserWin.webContents.send('user-to-update', user)
      })

      updatedUserWin.on('closed', () => {
        updatedUserWin = null
      })
    }
  })

  ipcMain.on('add-user', (event, user) => {
    const updatedUsers = usersData.addUser(user).users

    mainWindow.send('users', updatedUsers)
  })

  ipcMain.on('delete-user', (event, userID) => {
    const updatedUsers = usersData.deleteUser(userID).users

    mainWindow.send('users', updatedUsers)
  })

  ipcMain.on('update-user', (event, user) => {
    const updatedUsers = usersData.updateUser(user).users

    mainWindow.send('users', updatedUsers)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
