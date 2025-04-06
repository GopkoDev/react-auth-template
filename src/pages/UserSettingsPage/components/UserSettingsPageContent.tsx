import { JSX } from 'react';

import { userStore } from '../../../store/user-store';
import { logout } from '../../../api/auth';

import { Button } from '../../../UI/components/Button/Button';

export const UserSettingsPageContent = (): JSX.Element => {
  const handleLogout = async () => {
    try {
      await logout();
      userStore.clearUser();
      window.location.href = '/';
    } catch (error) {
      console.warn('[LOGOUT ERROR]', error);
    }
  };

  return (
    <div style={{ margin: 'auto 0', width: '300px' }}>
      <Button width="100%" variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
