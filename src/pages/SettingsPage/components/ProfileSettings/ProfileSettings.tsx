import { JSX } from 'react';
import './ProfileSettings.scss';
import { observer } from 'mobx-react-lite';
import userStore from '../../../../store/user-store';
import { PhotoSettings } from '../PhotoSettings/PhotoSettings';
import { NameSettings } from '../NameSettings/NameSettings';
import { EmailSettings } from '../EmailSettings/EmailSettings';

export const ProfileSettings = observer((): JSX.Element => {
  const user = userStore.user;

  return (
    <section className="profile_settings">
      <PhotoSettings user={user} />
      <NameSettings user={user} />
      <EmailSettings user={user} />
    </section>
  );
});
