const { dialog } = require('electron');

const openFile = async ({ ownerWin, defaultPath }) => {
  const options = {
    // See place holder 1 in above image
    title: '파일 선택',

    // See place holder 2 in above image
    defaultPath,

    // See place holder 4 in above image
    filters: [
      { name: '사진', extensions: ['jpg', 'png', 'gif'] },
      { name: '동영상', extensions: ['mxf', 'mp4'] },
      { name: '모든 파일', extensions: ['*'] },
    ],
    properties: ['openFile'],
  };
  const result = await dialog.showOpenDialog(ownerWin, options);
  return result;
};

module.exports = { openFile };
