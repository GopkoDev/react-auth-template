import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../../store/loader-store';

import { PublicLayout } from '../../../UI/layouts/PublicLayout/PublicLayout';
import { Loader } from '../../../UI/components/Loader/Loader';
import { RegistrationPageContent } from './components/RegistrationPageContent/RegistrationPageContent';

export const RegistrationPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PublicLayout pageTitle="Registration">
      <RegistrationPageContent />
      <Loader isOpen={isLoading} />
    </PublicLayout>
  );
});
