import { uploadItemStore, downloadItemStore } from './store';

function useStore() {
  return { uploadItemStore, downloadItemStore };
}

export default useStore;
