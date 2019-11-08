const { observable } = require('mobx');

// const userStore = observable({
//   isLoggingIn: false,
//   data: null,
//   logIn(data) {
//     this.isLoggingIn = true;
//     setTimeout(() => {
//       this.data = data;
//       this.isLoggingIn = false;
//       postStore.data.push(1);
//     }, 2000);
//   },
//   logOut() {
//     this.data = null;
//   },
// });

const uploadItemStore = observable({
  fileName: '',
});

const downloadItemStore = observable({
  fileName: '',
});

export { uploadItemStore, downloadItemStore };
