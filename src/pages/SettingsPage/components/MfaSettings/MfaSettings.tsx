import { JSX } from 'react';
import { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { SwitchButton } from '../../../../UI/components/SwitchButton/SwitchButton';

interface MfaSettingsProps {
  user: UserStoreStateType;
}

export const MfaSettings = ({ user }: MfaSettingsProps): JSX.Element => {
  const label = user.twoFactorEnabled ? 'Enabled' : 'Disabled';
  const editHandler = (): void => {
    console.log('Edit MfaSettings clicked');
  };
  return (
    <SettingsItem label="Two-factor authentication">
      <SettingsItem.Body>
        <SwitchButton
          isChecked={user.twoFactorEnabled}
          onChange={editHandler}
          label={label}
        />
      </SettingsItem.Body>
    </SettingsItem>
  );
};
