import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../../store/loader-store';

import { PublicLayout } from '../../../UI/layouts/PublicLayout/PublicLayout';
import { LoginPageContent } from './components/LoginPageContent/LoginPageContent';
import { Loader } from '../../../UI/components/Loader/Loader';

export const LoginPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PublicLayout pageTitle="Login">
      <LoginPageContent />
      <Loader isOpen={isLoading} />
    </PublicLayout>
  );
});
