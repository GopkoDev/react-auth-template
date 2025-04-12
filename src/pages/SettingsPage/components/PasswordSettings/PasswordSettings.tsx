import { JSX } from 'react';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';

export const PasswordSettings = (): JSX.Element => {
  const editHandler = (): void => {
    console.log('Edit password clicked');
  };

  return (
    <SettingsItem label="Password">
      <SettingsItem.Body>********</SettingsItem.Body>
      <SettingsItem.Edit>
        <Button width="100%" variant="ghost" onClick={editHandler}>
          Edit
        </Button>
      </SettingsItem.Edit>
    </SettingsItem>
  );
};
