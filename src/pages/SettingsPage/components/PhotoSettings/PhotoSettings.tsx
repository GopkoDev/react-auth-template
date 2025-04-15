import { JSX } from 'react';
import userStore, { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Avatar } from '../../../../UI/components/Avatar/Avatar';
import { Button } from '../../../../UI/components/Button/Button';
import { ModalConfig } from '../../../../UI/Modals/UpdateUserProfileModal/UpdateUserProfileModal';
import { z } from 'zod';
import modalStore from '../../../../store/modal-store';

interface PhotoSettingsProps {
  user: UserStoreStateType;
}

const AvatarSchema = z.object({
  avatar: z.string().url('Invalid URL'),
});

type AvatarSchemaType = z.infer<typeof AvatarSchema>;

const avatarConfig: ModalConfig<typeof AvatarSchema> = {
  title: 'Update Your Avatar',
  libelText: 'Enter avatar URL',
  inputPlaceholder: 'https://example.com/avatar.jpg',
  field: 'avatar', // TypeScript will ensure this matches the schema
  schema: AvatarSchema,
  type: 'avatar',
};

export const PhotoSettings = ({ user }: PhotoSettingsProps): JSX.Element => {
  const confirmHandler = async (data: AvatarSchemaType): Promise<void> => {
    const { avatar } = data;
    await userStore.updateProfile({ avatar });
    modalStore.resetModalProps();
  };

  const editHandler = (): void => {
    modalStore.updateModalProps({
      config: avatarConfig,
      updateUserProfileModal: true,
      onConfirm: confirmHandler,
    });
  };

  return (
    <SettingsItem label="Photo">
      <SettingsItem.Body>
        <Avatar userName={user.name} src={user.photoUrl} />
      </SettingsItem.Body>
      <SettingsItem.Edit>
        <Button width="100%" variant="ghost" onClick={editHandler}>
          Edit
        </Button>
      </SettingsItem.Edit>
    </SettingsItem>
  );
};
