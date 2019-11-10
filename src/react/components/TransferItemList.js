import React from 'react';
import { List, Progress, Avatar, Tooltip, Button, Icon } from 'antd';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';
import getStatusText from '../utils/getStatusText';

const ButtonGroup = Button.Group;

const TransferItemList = () => {
  const { transferListStore } = useStore();

  return useObserver(() => (
    <List
      dataSource={transferListStore.data}
      renderItem={item => (
        <List.Item
          actions={
            item.status === 'working'
              ? [
                <ButtonGroup>
                    <Button icon="stop" type="primary" size="small" />
                  </ButtonGroup>,
                ]
              : [
                <ButtonGroup>
                    <Button icon="delete" type="primary" size="small" />
                  </ButtonGroup>,
                ]
          }
        >
          <List.Item.Meta
            avatar={
              item.type === 'upload' ? (
                <Avatar icon="upload" style={{ backgroundColor: '#87d068' }} />
              ) : (
                <Avatar
                  icon="download"
                  style={{ backgroundColor: 'dodgerblue' }}
                />
              )
            }
            title={item.fileName}
            description=""
          />
          <div style={{ marginRight: 10 }}>{getStatusText(item.status)}</div>
          <Progress
            type="circle"
            percent={item.progress}
            width={30}
            status={item.error ? 'exception' : null}
          />
        </List.Item>
      )}
    />
  ));
};

export default TransferItemList;
