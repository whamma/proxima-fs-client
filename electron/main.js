const electron = require('electron');

const { app, dialog, Tray, Menu, ipcMain, BrowserWindow } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const Url = require('url-parse');
const logger = require('electron-log');

const { channels } = require('../src/shared/constants');
const { openFile } = require('./openFile');

// eslint-disable-next-line import/no-extraneous-dependencies

const PROTOCOL = 'gemiso.proxima-fs';

let mainWindow;

const appLock = app.requestSingleInstanceLock();

if (!appLock) {
  app.quit();
  app.exit();
} else {
  app.on('second-instance', (event, argv, workingDir) => {
    logger.debug(`second-instance : ${JSON.stringify(argv)}`);
    if (mainWindow) {
      mainWindow.restore();
      mainWindow.focus();
    }
  });
}

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

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// function createTray() {
//   mainWindow.on('close', event => {
//     event.preventDefault();
//     mainWindow.hide();
//   });

//   const tray = new Tray(path.join(__static, 'favicon.ico'));
//   tray.on('click', () => {
//     // mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
//     mainWindow.show();
//   });
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: `v${app.getVersion()}`,
//     },
//     {
//       label: 'Close',
//       click() {
//         mainWindow.close();
//         app.quit();
//         app.exit();
//       },
//     },
//   ]);
//   tray.setContextMenu(contextMenu);
// }

let customUrl = '';

app.on('ready', () => {
  const mockArgs = 'gemiso.proxima-fs://?job_id=10';
  logger.debug('App started.');
  logger.debug(process.argv);

  if (!isDev && !app.isDefaultProtocolClient(PROTOCOL)) {
    const filePath = app.getPath('exe');
    console.log(`filePath: ${filePath}`);
    app.setAsDefaultProtocolClient(PROTOCOL, filePath);
  }

  createWindow();
});

app.on('open-url', (event, url) => {
  if (app.isReady()) {
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

  const filePath = result.filePaths[0];

  event.sender.send(channels.FILE_OPEN, {
    filePath,
    fileName: path.basename(filePath),
  });
});
