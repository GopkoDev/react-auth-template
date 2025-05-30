import { makeAutoObservable, runInAction } from 'mobx';

class LoaderStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setIsLoading(): void {
    runInAction(() => {
      this.isLoading = true;
    });
  }

  closeLoader(): void {
    runInAction(() => {
      this.isLoading = false;
    });
  }
}

export default new LoaderStore();
