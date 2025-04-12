import { JSX } from 'react';
import userStore from '../../../../../store/user-store';
import { publicFetcher } from '../../../../../lib/publicFetcher';
import { Button } from '../../../Button/Button';

export const NavFooter = (): JSX.Element => {
  const handleLogout = async () => {
    try {
      await publicFetcher(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        'POST'
      );
      localStorage.removeItem('accessToken');
      userStore.clearUser();
      window.location.href = '/';
    } catch (error) {
      console.warn('[LOGOUT ERROR]', error);
    }
  };
  return (
    <div className="main_nav--footer">
      <Button width="100%" variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
      <div className="main_nav--footer--copyright">© 2025 Start Template</div>
    </div>
  );
};
