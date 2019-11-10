import React from 'react';
import '../App.css';
import { Layout } from 'antd';
import Toolbar from './components/Toolbar';
import TransferItemList from './components/TransferItemList';
import useStore from './useStore';

const { Content } = Layout;

const App = () => {
  const { transferListStore } = useStore();
  transferListStore.addItem({
    fileName: '테스트.mp4',
    type: 'upload',
    status: 'working',
    progress: 34,
    error: null,
  });
  transferListStore.addItem({
    fileName: '테스트2.mp4',
    type: 'download',
    status: 'queued',
    progress: 0,
    error: null,
  });
  transferListStore.addItem({
    fileName: '테스트2.mp4',
    type: 'download',
    status: 'error',
    progress: 0,
    error: 'download error',
  });

  return (
    <div>
      <Layout>
        <Toolbar />
        <Content style={{ padding: 24 }}>
          <TransferItemList />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
