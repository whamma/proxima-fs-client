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
    this.data.push(item);
  },
  updateStatus(newItem) {
    const itemToTake = this.findItem(newItem.id);
    if (itemToTake === null) {
      return;
    }
    itemToTake.status = newItem.status;
    itemToTake.progress = newItem.progress;
    console.log(this.data);
  },
  findItem(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        return this.data[i];
      }
    }
    return null;
  },
});

export { transferListStore };
