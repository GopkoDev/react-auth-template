import { JSX } from 'react';
import { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';

interface EmailSettingsProps {
  user: UserStoreStateType;
}

export const EmailSettings = ({ user }: EmailSettingsProps): JSX.Element => {
  const editHandler = (): void => {
    console.log('Edit email clicked');
  };
  return (
    <SettingsItem label="Contact email">
      <SettingsItem.Body>{user.email}</SettingsItem.Body>
      <SettingsItem.Edit>
        <Button width="100%" variant="ghost" onClick={editHandler}>
          Edit
        </Button>
      </SettingsItem.Edit>
    </SettingsItem>
  );
};
