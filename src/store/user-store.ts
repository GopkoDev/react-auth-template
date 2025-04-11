import { makeAutoObservable } from 'mobx';
import { privateFetcher } from '../lib/privateFetcher';

class UserStore {
  user = {
    id: null as string | null,
    name: null as string | null,
    email: null as string | null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      const data = await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/user`
      );

      this.user = data;

      return data;
    } catch (error) {
      console.warn('Failed to fetch user:', error);
      throw error;
    }
  }

  clearUser() {
    this.user = { id: null, name: null, email: null };
  }
}

export const userStore = new UserStore();
