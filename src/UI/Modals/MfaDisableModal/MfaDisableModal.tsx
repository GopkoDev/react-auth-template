import { JSX, useEffect, useState } from 'react';
import './MfaDisableModal.scss';
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { useToast } from '../../components/Toast/ToastProvider';
import { OtpInput } from '../../inputs/OtpInput/OtpInput';

interface MfaDisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => Promise<void>;
}

const MfaDisableModal = ({
  isOpen,
  onClose,
  onConfirm,
}: MfaDisableModalProps): JSX.Element => {
  const { addToast } = useToast();
  const [otpInputCode, setOtpInputCode] = useState<string>('');
  const isFullCode = otpInputCode.length === 6;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isFullCode) {
        confirmHandler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullCode]);

  const confirmHandler = async () => {
    if (isFullCode) {
      try {
        await onConfirm(otpInputCode);
        addToast('Two-factor authentication disabled');
        onClose();
      } catch (error) {
        addToast(
          'Failed to disable two-factor authentication. Please try again.'
        );
      }
    }
  };

  const inputHandler = (code: string) => {
    setOtpInputCode(code);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Disable two-factor authentication</ModalHeader>
      <ModalBody customClassName="mfa_disable_modal">
        <p className="mfa_disable_modal--subtitle">
          To continue, please enter your password from app. This will disable
          two-step authentication entirely.
        </p>

        <div className="mfa_disable_modal--input">
          <p className="mfa_disable_modal--input--label">Enter code:</p>
          <OtpInput length={6} onChange={inputHandler} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button disabled={!isFullCode} onClick={confirmHandler}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MfaDisableModal;
