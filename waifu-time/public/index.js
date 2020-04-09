const path = require('path');
const { BrowserWindow, app, ipcMain } = require('electron');
const { getPluginEntry } = require('mpv.js');

require('./eventChannels');

let pdir = path.join(__dirname);
if (process.platform !== 'linux') {
  process.chdir(pdir);
}

if (process.platform === 'darwin') {
  pdir = path.join(__dirname, 'mac-mpv-binary');
  process.chdir(pdir);
} else if (process.platform === 'win32') {
  pdir = path.join(__dirname, 'windows-mpv-binary');
  process.chdir(pdir);
}

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('register-pepper-plugins', getPluginEntry(pdir));

// Needed because NaCL is deprecated in since electron 4.2.9
app.commandLine.appendSwitch('no-sandbox');

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 574,
    autoHideMenuBar: true,
    webPreferences: { plugins: true, nodeIntegration: true },
  });
  // win.loadURL(`file://${__dirname}/index.html`);
  win.loadURL('http://localhost:3000/');

  win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  app.quit();
});
