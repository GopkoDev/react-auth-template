import { makeAutoObservable, runInAction } from 'mobx';
import { privateFetcher } from '../lib/privateFetcher';

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  twoFactorEnabled: boolean;
}

const initialUser = {
  id: null,
  name: null,
  email: null,
  avatar: null,
  twoFactorEnabled: false,
};

class UserStore {
  user: User = initialUser;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      const data = await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/user`
      );

      runInAction(() => {
        this.user = data.user;
      });

      return data;
    } catch (error) {
      console.warn('Failed to fetch user:', error);
      throw error;
    }
  }

  clearUser() {
    runInAction(() => {
      this.user = initialUser;
    });
  }
}

export default new UserStore();
