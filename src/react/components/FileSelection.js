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

  ipcRenderer.on(channels.FILE_OPEN, (event, args) => {
    const { filePath, fileName } = args;
    console.log(args);
    transferListStore.addItem({
      type: 'upload',
      filePath,
      fileName,
      status: 'queued',
      progress: 0,
    });
  });

  return useObserver(() => (
    <>
      <Button icon="upload" onClick={handleUploadClick}>
        업로드
      </Button>
    </>
  ));
};

export default FileSelection;
