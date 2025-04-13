import React, { JSX } from 'react';
import modalStore from '../../../../store/modal-store';
import { observer } from 'mobx-react-lite';

const MfaModalLazy = React.lazy(
  () => import('../../../../UI/Modals/MfaModal/MfaModal')
);

const MfaDisableModalLazy = React.lazy(
  () => import('../../../../UI/Modals/MfaDisableModal/MfaDisableModal')
);

export const SettingsModalsContainer = observer((): JSX.Element => {
  const { modalProps } = modalStore;

  return (
    <>
      <React.Suspense fallback={<span></span>}>
        {modalProps.mfaModal && (
          <MfaModalLazy
            isOpen={modalProps.mfaModal}
            onClose={modalProps.onClose}
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
            onClose={modalProps.onClose}
            onConfirm={modalProps.onConfirm}
          />
        )}
      </React.Suspense>
    </>
  );
});
