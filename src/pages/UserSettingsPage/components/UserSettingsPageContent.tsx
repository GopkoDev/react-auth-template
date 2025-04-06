import { JSX } from 'react';
import { Button } from '../../../UI/components/Button/Button';
import { logout } from '../../../api/auth';
import { userStore } from '../../../store/user-store';

export const UserSettingsPageContent = (): JSX.Element => {
  const handleLogout = async () => {
    try {
      await logout();
      userStore.clearUser();
      window.location.href = '/';
    } catch (error) {
      console.error('[LOGOUT ERROR]', error);
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
