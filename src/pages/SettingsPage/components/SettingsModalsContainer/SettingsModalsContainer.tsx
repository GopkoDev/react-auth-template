import React, { JSX } from 'react';
import modalStore from '../../../../store/modal-store';
import { observer } from 'mobx-react-lite';

const MfaModalLazy = React.lazy(
  () => import('../../../../UI/Modals/MfaModal/MfaModal')
);

const MfaDisableModalLazy = React.lazy(
  () => import('../../../../UI/Modals/MfaDisableModal/MfaDisableModal')
);

const UpdateUserProfileModalLazy = React.lazy(
  () =>
    import(
      '../../../../UI/Modals/UpdateUserProfileModal/UpdateUserProfileModal'
    )
);

export const SettingsModalsContainer = observer((): JSX.Element => {
  const { modalProps } = modalStore;

  const close = (): void => {
    modalStore.resetModalProps();
  };

  return (
    <>
      <React.Suspense fallback={<span></span>}>
        {modalProps.mfaModal && (
          <MfaModalLazy
            isOpen={modalProps.mfaModal}
            onClose={close}
            qrCodeUrl={modalProps.qrCodeUrl}
            secret={modalProps.secret}
            onConfirm={modalProps.onConfirm}
          />
        )}
      </React.Suspense>

      <React.Suspense fallback={<span></span>}>
        {modalProps.mfaDisableModal && (
          <MfaDisableModalLazy
            isOpen={modalProps.mfaDisableModal}
            onClose={close}
            onConfirm={modalProps.onConfirm}
          />
        )}
      </React.Suspense>

      <React.Suspense fallback={<span></span>}>
        {modalProps.updateUserProfileModal && (
          <UpdateUserProfileModalLazy
            isOpen={modalProps.updateUserProfileModal}
            onClose={close}
            config={modalProps.config}
            onConfirm={modalProps.onConfirm}
          />
        )}
      </React.Suspense>
    </>
  );
});
