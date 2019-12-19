import React from 'react';
import { Layout, Button } from 'antd';
import FileSelection from './FileSelection';

import './Toolbar.css';

const { Header } = Layout;

const Toolbar = () => {
  const handleStartClick = () => {};

  return (
    <Header className="Header">
      <FileSelection />
      <Button onClick={handleStartClick}>시작</Button>
    </Header>
  );
};

export default Toolbar;
