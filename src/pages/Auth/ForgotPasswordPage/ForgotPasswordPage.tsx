import { JSX } from 'react';
import { observer } from 'mobx-react-lite';
import loaderStore from '../../../store/loader-store';
import { Loader } from '../../../UI/components/Loader/Loader';
import { PublicLayout } from '../../../UI/layouts/PublicLayout/PublicLayout';
import { ForgotPasswordPageContent } from './components/ForgotPasswordPageContent/ForgotPasswordPageContent';

export const ForgotPasswordPage = observer((): JSX.Element => {
  const { isLoading } = loaderStore;

  return (
    <PublicLayout pageTitle="Forgot Password">
      <ForgotPasswordPageContent />
      <Loader isOpen={isLoading} />
    </PublicLayout>
  );
});
