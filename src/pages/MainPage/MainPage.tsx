import { JSX } from 'react';
import { MainPageContent } from './components/MainPageContent/MainPageContent';
import { Loader } from '../../UI/components/Loader/Loader';
import loaderStore from '../../store/loader-store';
import { observer } from 'mobx-react-lite';
import { PrivateLayout } from '../../UI/layouts/PrivateLayout/PrivateLayout';
import { PageHeader } from '../../UI/components/PageHeader/PageHeader';

const pageTitle = 'Main Page';

export const MainPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PrivateLayout pageTitle={pageTitle}>
      <PageHeader pageName={pageTitle} />
      <MainPageContent />
      <Loader isOpen={isLoading} />
    </PrivateLayout>
  );
});
