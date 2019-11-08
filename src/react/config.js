const Store = require('electron-store');

const schema = {
  fileServerApi: {
    url: '',
  },
  downloadDir: '',
  uploadDir: '',
};

const config = new Store(schema);

module.exports = { config };
