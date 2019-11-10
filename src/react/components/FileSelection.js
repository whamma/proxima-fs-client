import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { Button } from 'antd';
import { channels } from '../../shared/constants';
import useStore from '../useStore';

// eslint-disable-next-line no-undef
const { ipcRenderer } = window.require('electron');

const { transferListStore } = useStore();

const FileSelection = () => {
  const state = useLocalStore(() => ({
    filePath: '',
  }));

  const handleUploadClick = () => {
    ipcRenderer.send(channels.FILE_OPEN);
  };

  const handleTestClick = () => {
    const item = transferListStore.data[0];
    item.progress = 40;
    transferListStore.updateStatus(item);
  };

  ipcRenderer.on(channels.FILE_OPEN, (event, arg) => {
    const { filePath } = arg;
    state.filePath = filePath;
  });

  return useObserver(() => (
    <>
      <Button icon="upload" onClick={handleUploadClick}>
        업로드
      </Button>
      <Button onClick={handleTestClick}>Test</Button>
    </>
  ));
};

export default FileSelection;
