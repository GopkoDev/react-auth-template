import { JSX } from 'react';
import userStore, { UserStoreStateType } from '../../../../store/user-store';
import { SettingsItem } from '../SettingsItem/SettingsItem';
import { SwitchButton } from '../../../../UI/components/SwitchButton/SwitchButton';
import modalStore from '../../../../store/modal-store';
import loaderStore from '../../../../store/loader-store';

interface MfaSettingsProps {
  user: UserStoreStateType;
}

export const MfaSettings = ({ user }: MfaSettingsProps): JSX.Element => {
  const label = user.twoFactorEnabled ? 'Enabled' : 'Disabled';
  const { enableTwoFactor, verifyTwoFactor, disableTwoFactor } = userStore;

  const editHandler = async (chacked: boolean): Promise<void> => {
    if (chacked) {
      const data = await enableTwoFactor();
      if (data) {
        const qrCodeUrl = data.qrCodeUrl;
        const secret = data.secret;

        modalStore.updateModalProps({
          mfaModal: true,
          qrCodeUrl: qrCodeUrl,
          secret: secret,
          onConfirm: async (code: string) => {
            await verifyTwoFactor(code);
          },
        });
      }
    } else {
      modalStore.updateModalProps({
        mfaDisableModal: true,
        onConfirm: async (code: string) => {
          await disableTwoFactor(code);
        },
      });
    }
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
