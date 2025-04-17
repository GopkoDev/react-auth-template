import { JSX } from 'react';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';
import modalStore from '../../../../store/modal-store';
import userStore from '../../../../store/user-store';
import { useToast } from '../../../../UI/components/Toast/ToastProvider';
import { getApiErrorMessage } from '../../../../lib/apiError';

interface UpdatePassworProps {
  currentPassword: string;
  newPassword: string;
  logoutAllDevices?: boolean;
}

export const PasswordSettings = (): JSX.Element => {
  const { addToast } = useToast();

  const updatePassword = async ({
    currentPassword,
    newPassword,
    logoutAllDevices,
  }: UpdatePassworProps): Promise<void> => {
    try {
      console.log(logoutAllDevices);
      await userStore.updatePassword({
        currentPassword,
        newPassword,
        logoutAllDevices,
      });
      modalStore.resetModalProps();
      addToast('Your password has been changed successfully.');
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
      console.warn('Failed to update password:', errorMessage);
    }
  };

  const editHandler = (): void => {
    modalStore.updateModalProps({
      changeUserPasswordModal: true,
      onclose: modalStore.resetModalProps,
      onConfirm: updatePassword,
    });
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
