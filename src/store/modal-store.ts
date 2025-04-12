import { makeAutoObservable, runInAction } from 'mobx';

export interface ModalProps {
  [key: string]: any;
}

class ModalStore {
  modalProps: ModalProps = {};

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  updateModalProps = (payload: ModalProps): void => {
    const payloadPairs = Object.entries(payload);
    payloadPairs.forEach(([key, value]) => {
      runInAction(() => {
        this.modalProps[key] = value;
      });
    });
  };

  resetModalProps = (): void => {
    runInAction(() => {
      this.modalProps = {};
    });
  };
}

export default new ModalStore();
