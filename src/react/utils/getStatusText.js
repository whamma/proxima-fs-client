const statusTextMap = {
  queued: '대기중',
  working: '전송중',
  aborted: '취소됨',
  error: '오류',
  finished: '완료',
};

const getStatusText = status => {
  let text = statusTextMap[status];
  if (text === undefined) {
    text = 'unknown';
  }
  return text;
};

export default getStatusText;
