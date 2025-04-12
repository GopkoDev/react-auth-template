import { JSX } from 'react';
import { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Avatar } from '../../../../UI/components/Avatar/Avatar';
import { Button } from '../../../../UI/components/Button/Button';

interface PhotoSettingsProps {
  user: UserStoreStateType;
}

export const PhotoSettings = ({ user }: PhotoSettingsProps): JSX.Element => {
  const editHandler = (): void => {
    console.log('Edit photo clicked');
  };
  return (
    <SettingsItem label="Photo">
      <SettingsItem.Body>
        <Avatar userName={user.name} src={user.avatar} />
      </SettingsItem.Body>
      <SettingsItem.Edit>
        <Button width="100%" variant="ghost" onClick={editHandler}>
          Edit
        </Button>
      </SettingsItem.Edit>
    </SettingsItem>
  );
};
