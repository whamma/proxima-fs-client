import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { channels } from '../../shared/constants';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

const FileSelection = () => {
  const state = useLocalStore(() => ({
    filePath: '',
  }));

  const handleClick = () => {
    ipcRenderer.send(channels.FILE_OPEN);
  };

  ipcRenderer.on(channels.FILE_OPEN, (event, arg) => {
    const { filePath } = arg;
    state.filePath = filePath;
  });

  return useObserver(() => (
    <div>
      <button onClick={handleClick}>Upload</button>
      {state.filePath && <p>{state.filePath}</p>}
    </div>
  ));
};

export default FileSelection;
