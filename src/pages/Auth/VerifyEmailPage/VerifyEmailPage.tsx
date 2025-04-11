import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../../store/loader-store';
import { PublicLayout } from '../../../UI/layouts/PublicLayout/PublicLayout';
import { VerifyEmailPageContent } from './components/VerifyEmailPageContent/VerifyEmailPageContent';
import { Loader } from '../../../UI/components/Loader/Loader';

export const VerifyEmailPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PublicLayout pageTitle="Email Confirmation">
      <VerifyEmailPageContent />
      <Loader isOpen={isLoading} />
    </PublicLayout>
  );
});
