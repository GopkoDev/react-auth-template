import { JSX, useRef } from 'react';
import userStore, { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { Button } from '../../../../UI/components/Button/Button';
import modalStore from '../../../../store/modal-store';
import { useToast } from '../../../../UI/components/Toast/ToastProvider';
import { getApiErrorMessage } from '../../../../lib/apiError';

interface EmailSettingsProps {
  user: UserStoreStateType;
}

export const EmailSettings = ({ user }: EmailSettingsProps): JSX.Element => {
  const token = useRef<string>('');
  const { addToast } = useToast();

  const handelEmailStep = async (
    email: string
  ): Promise<{ success: boolean }> => {
    try {
      token.current = '';
      const data = await userStore.initiateEmailChange(email);
      token.current = data.token;
      addToast(
        'Verification PIN sent to your new email address. Please check your inbox.'
      );
      return { success: true };
    } catch (error) {
      const message = getApiErrorMessage(error);
      addToast(
        message || 'Failed to send verification email. Please try again later.',
        'error'
      );
      console.warn('Error sending email verification:', error);
      return { success: false };
    }
  };

  const handlePinStep = async (pin: string): Promise<void> => {
    try {
      await userStore.confirmEmailChange(pin, token.current);
      modalStore.resetModalProps();
      addToast('Email changed successfully.');
    } catch (error) {
      const message = getApiErrorMessage(error);
      addToast(
        message ||
          'Failed to confirm email verification. Please try again later.',
        'error'
      );
      console.warn('Error confirming email verification:', error);
    }
  };

  const editHandler = (): void => {
    modalStore.updateModalProps({
      changeUserEmailModal: true,
      onConfirmMail: handelEmailStep,
      onConfirmPin: handlePinStep,
    });
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
