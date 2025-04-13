import { makeAutoObservable, runInAction } from 'mobx';
import { privateFetcher } from '../lib/privateFetcher';
import { User } from '../types/user-types';
import {
  DisableTwoFactorResponse,
  GenerateMfaResponse,
  VerifyMfaResponse,
} from '../types/two-factor';

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
    makeAutoObservable(this, {}, { deep: true });
  }

  fetchUser = async (): Promise<User> => {
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
  };

  enableTwoFactor = async (): Promise<GenerateMfaResponse> => {
    try {
      const data = (await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/two-factor/generate`,
        'POST'
      )) as GenerateMfaResponse;

      return data;
    } catch (error) {
      console.warn('Failed to enable two-factor authentication:', error);
      throw error;
    }
  };

  verifyTwoFactor = async (secret: string): Promise<VerifyMfaResponse> => {
    try {
      const data = (await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/two-factor/verify`,
        'POST',
        {
          body: JSON.stringify({
            token: secret,
          }),
        }
      )) as VerifyMfaResponse;

      runInAction(() => {
        // Create a new reference with all existing properties
        const updatedUser = { ...this.user };
        updatedUser.twoFactorEnabled = true;
        this.user = updatedUser;
      });

      return data;
    } catch (error) {
      console.warn('Failed to confirm two-factor authentication:', error);
      throw error;
    }
  };

  disableTwoFactor = async (
    secret: string
  ): Promise<DisableTwoFactorResponse> => {
    console.log(this);

    try {
      const data = (await privateFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/two-factor/disable`,
        'POST',
        {
          body: JSON.stringify({
            token: secret,
          }),
        }
      )) as DisableTwoFactorResponse;

      runInAction(() => {
        // Create a new reference with all existing properties
        const updatedUser = { ...this.user };
        updatedUser.twoFactorEnabled = false;
        this.user = updatedUser;
      });

      return data;
    } catch (error) {
      console.warn('Failed to disable two-factor authentication:', error);
      throw error;
    }
  };

  clearUser = () => {
    runInAction(() => {
      this.user = initialUser;
    });
  };
}

export default new UserStore();
