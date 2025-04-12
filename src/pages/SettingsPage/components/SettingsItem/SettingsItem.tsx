import React, { JSX } from 'react';
import './SettingsItem.scss';

export interface SettingsItemProps {
  label: string;
  children: React.ReactNode;
}

const SettingsItem = ({ label, children }: SettingsItemProps): JSX.Element => {
  return (
    <div className="settings_item">
      <span className="settings_item--label">{label}</span>
      {children}
    </div>
  );
};

const Body = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <span className="settings_item--value">{children}</span>;
};

const Edit = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="settings_item--edit">{children}</div>;
};

SettingsItem.Body = Body;
SettingsItem.Edit = Edit;

export { SettingsItem };
