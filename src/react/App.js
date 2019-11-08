import React, { useState } from 'react';
import '../App.css';
import { channels } from '../shared/constants';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

function App() {
  const [appInfo, setAppInfo] = useState({
    appName: '',
    appVersion: '',
  });

  const handleClick = () => {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      setAppInfo({ appName, appVersion });
    });
  };
  return (
    <div>
      <button onClick={handleClick}>Upload</button>
      {appInfo.appName && (
        <p>
          {appInfo.appName} version {appInfo.appVersion}
        </p>
      )}
    </div>
  );
}

export default App;
