const getStatusText = status => {
  switch (status) {
    case 'queued':
      return '대기중';
    case 'working':
      return '전송중';
    case 'aborted':
      return '취소됨';
    case 'error':
      return '오류';
    case 'finished':
      return '완료';
    default:
      return 'Unknown';
  }
};

export default getStatusText;
