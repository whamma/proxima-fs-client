import React from 'react';
import { List, Progress, Avatar } from 'antd';
import useStore from '../useStore';
import getStatusText from '../utils/getStatusText';

const TransferItemList = () => {
  const { transferListStore } = useStore();

  return (
    <List
      dataSource={transferListStore.data}
      renderItem={item => (
        <List.Item
          actions={
            item.status === 'working' ? null : [<a key="item-remove">삭제</a>]
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
  );
};

export default TransferItemList;
