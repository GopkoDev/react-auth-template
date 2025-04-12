import { JSX } from 'react';
import { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';

interface NameSettingsProps {
  user: UserStoreStateType;
}

export const NameSettings = ({ user }: NameSettingsProps): JSX.Element => {
  const editHandler = (): void => {
    console.log('Edit Name clicked');
  };
  return (
    <SettingsItem label="Full name">
      <SettingsItem.Body>{user.name}</SettingsItem.Body>
      <SettingsItem.Edit>
        <Button width="100%" variant="ghost" onClick={editHandler}>
          Edit
        </Button>
      </SettingsItem.Edit>
    </SettingsItem>
  );
};
