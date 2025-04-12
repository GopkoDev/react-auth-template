import { JSX } from 'react';
import './NotificationSettings.scss';

export const NotificationSettings = (): JSX.Element => {
  return (
    <section className="notification_settings">
      <div className="notification_settings--header">
        <h2>Notification Settings</h2>
      </div>
      <div className="notification_settings--content">
        <p>Notification settings content goes here.</p>
      </div>
    </section>
  );
};
