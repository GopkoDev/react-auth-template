import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../store/loader-store';

import { SettingsPageContent } from './components/SettingsPageContent/SettingsPageContent';
import { Loader } from '../../UI/components/Loader/Loader';
import { PrivateLayout } from '../../UI/layouts/PrivateLayout/PrivateLayout';
import { PageHeader } from '../../UI/components/PageHeader/PageHeader';

const pageTitle = 'Settings';

export const SettingsPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PrivateLayout pageTitle={pageTitle}>
      <PageHeader pageName={pageTitle} />
      <SettingsPageContent />
      <Loader isOpen={isLoading} />
    </PrivateLayout>
  );
});
