import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../store/loader-store';

import { UserSettingsPageContent } from './components/UserSettingsPageContent';
import { Loader } from '../../UI/components/Loader/Loader';
import { PrivateLayout } from '../../UI/layouts/PrivateLayout/PrivateLayout';

export const UserSettingsPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PrivateLayout customClassName="login_page">
      <UserSettingsPageContent />
      <Loader isOpen={isLoading} />
    </PrivateLayout>
  );
});
