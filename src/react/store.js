import { observable } from 'mobx';
import uuidv4 from 'uuid/v4';

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

// {
//   type: '',
//   fileName: '',
//   status: '',
//   error: '',
//   progress: 0,
// }
const transferListStore = observable({
  data: [],
  addItem(item) {
    item.id = uuidv4();
    this.data = [...this.data, item];
  },
  update(newItem) {
    const idx = this.data.findIndex(item => item.id === newItem.id);
    this.data = [
      ...this.data.slice(0, idx),
      newItem,
      ...this.data.slice(idx + 1),
    ];
  },
  find(id) {
    const itemToTake = this.data.find(item => item.id === id);
    return itemToTake;
  },
});

export { transferListStore };
