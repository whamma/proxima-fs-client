const electron = require('electron');

const { app, dialog, protocol, ipcMain, BrowserWindow } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const Url = require('url-parse');
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

let customUrl = '';
let mode = '';

app.on('ready', () => {
  // protocol.registerFileProtocol(PROTOCOL, (request, callback) => {
  //   const url = new Url(request.url);
  //   dialog.showMessageBox(mainWindow, {
  //     message: url.query,
  //   });
  // });

  console.log('protocol registed');
  createWindow();
});

app.on('open-url', (event, url) => {
  if(app.isReady()) {

  }
  customUrl = url;
  dialog.showMessageBox(null, {
    message: customUrl,
  });
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
