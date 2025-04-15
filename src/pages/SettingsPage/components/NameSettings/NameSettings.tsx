import { JSX } from 'react';
import userStore, { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';
import modalStore from '../../../../store/modal-store';
import { ModalConfig } from '../../../../UI/Modals/UpdateUserProfileModal/UpdateUserProfileModal';
import { z } from 'zod';

interface NameSettingsProps {
  user: UserStoreStateType;
}

const nameSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
});

type NameSchemaType = z.infer<typeof nameSchema>;

const nameConfig: ModalConfig<typeof nameSchema> = {
  title: 'Update Your Name',
  libelText: 'Enter full name',
  inputPlaceholder: 'Name',
  field: 'name', // TypeScript will ensure this matches the schema
  schema: nameSchema,
  type: 'name',
};

export const NameSettings = ({ user }: NameSettingsProps): JSX.Element => {
  const confirmHandler = async (data: NameSchemaType): Promise<void> => {
    const { name } = data;
    await userStore.updateProfile({ name });
    modalStore.resetModalProps();
  };

  const editHandler = (): void => {
    modalStore.updateModalProps({
      config: nameConfig,
      updateUserProfileModal: true,
      onConfirm: confirmHandler,
    });
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
