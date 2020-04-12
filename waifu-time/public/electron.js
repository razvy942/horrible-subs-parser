const path = require('path');
const { BrowserWindow, app, ipcMain } = require('electron');
const { getPluginEntry } = require('mpv.js');

const isDev = require('electron-is-dev');

require('./eventChannels');

const pluginDir = path.join(
  path.dirname(require.resolve('mpv.js')),
  'build',
  'Release'
);
// See pitfalls section for details.
if (process.platform !== 'linux') {
  process.chdir(pluginDir);
}

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch(
  'register-pepper-plugins',
  getPluginEntry(pluginDir)
);

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
  win.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  app.quit();
});
