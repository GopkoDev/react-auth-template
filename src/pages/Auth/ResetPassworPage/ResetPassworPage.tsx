import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../../store/loader-store';
import { PublicLayout } from '../../../UI/layouts/PublicLayout/PublicLayout';
import { ResetPassworPageContent } from './components/ResetPassworPageContent/ResetPassworPageContent';
import { Loader } from '../../../UI/components/Loader/Loader';

export const ResetPassworPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PublicLayout pageTitle="New Password">
      <ResetPassworPageContent />
      <Loader isOpen={isLoading} />
    </PublicLayout>
  );
});
