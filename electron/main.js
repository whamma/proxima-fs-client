const electron = require('electron');

const { app, protocol, ipcMain, BrowserWindow } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const { channels } = require('../src/shared/constants');
const { openFile } = require('./openFile');

// eslint-disable-next-line import/no-extraneous-dependencies

const PROTOCOL = 'gemiso.proxima-fs';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile('build/index.html');
  }

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  protocol.registerFileProtocol(PROTOCOL, (request, callback) => {
    const { url } = request;
    console.log(url);
    alert(url);
  });
  console.log('protocol registed');
  createWindow();
});

app.on('open-url', () => {
  console.log('@@@@');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.FILE_OPEN, async event => {
  const result = await openFile({
    ownerWin: mainWindow,
    defaultPath: app.getPath('documents'),
  });

  if (result.canceled) {
    return;
  }
  event.sender.send(channels.FILE_OPEN, {
    filePath: result.filePaths,
  });
});
