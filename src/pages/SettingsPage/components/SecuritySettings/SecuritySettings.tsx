import { JSX } from 'react';
import './SecuritySettings.scss';
import { PasswordSettings } from '../PasswordSettings/PasswordSettings';
import { MfaSettings } from '../MfaSettings/MfaSettings';
import userStore from '../../../../store/user-store';
import { observer } from 'mobx-react-lite';

export const SecuritySettings = observer((): JSX.Element => {
  const user = userStore.user;
  return (
    <section className="security_settings">
      <PasswordSettings />
      <MfaSettings user={user} />
    </section>
  );
});
