import { JSX } from 'react';
import './ProfileSettings.scss';

export const ProfileSettings = (): JSX.Element => {
  return (
    <section className="profile_settings">
      <div className="profile_settings--header">
        <h2>Profile Settings</h2>
      </div>
      <div className="profile_settings--content">
        <p>Profile settings content goes here.</p>
      </div>
    </section>
  );
};
