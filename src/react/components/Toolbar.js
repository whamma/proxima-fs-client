import React from 'react';
import { Layout } from 'antd';
import FileSelection from './FileSelection';
import './Toolbar.css';

const { Header } = Layout;

const Toolbar = () => {
  return (
    <Header className="Header">
      <FileSelection />
    </Header>
  );
};

export default Toolbar;
