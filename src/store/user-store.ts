import { makeAutoObservable, runInAction } from 'mobx';
import { privateFetcher } from '../lib/privateFetcher';
import { User } from '../types/user-types';

export type UserStoreStateType = Partial<User>;

const initialUser: UserStoreStateType = {
  id: undefined,
  name: undefined,
  email: undefined,
  avatar: undefined,
  twoFactorEnabled: false,
};

class UserStore {
  user: UserStoreStateType = initialUser;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      const data = await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/user`
      );

      runInAction(() => {
        this.user = data.user as User;
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
