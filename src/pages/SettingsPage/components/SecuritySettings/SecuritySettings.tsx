import { JSX } from 'react';
import './SecuritySettings.scss';

export const SecuritySettings = (): JSX.Element => {
  return (
    <section className="security_settings">
      <div className="security_settings--header">
        <h2>Security Settings</h2>
      </div>
      <div className="security_settings--content">
        <p>Security settings content goes here.</p>
      </div>
    </section>
  );
};
