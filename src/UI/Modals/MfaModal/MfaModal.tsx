import { JSX, useEffect, useRef, useState } from 'react';
import './MfaModal.scss';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { OtpInput } from '../../inputs/OtpInput/OtpInput';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { useToast } from '../../components/Toast/ToastProvider';

interface MfaModalProps {
  isOpen: boolean;
  qrCodeUrl: string;
  secret: string;
  onConfirm: (code: string) => Promise<void>;
  onClose: () => void;
}

const MfaModal = ({
  isOpen,
  qrCodeUrl,
  secret,
  onConfirm,
  onClose,
}: MfaModalProps): JSX.Element => {
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
        addToast('Two-factor authentication enabled');
        onClose();
      } catch (error) {
        addToast(
          'Failed to enable two-factor authentication. Please try again.'
        );
      }
    }
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(secret).then(() => {
      addToast('Code copied to clipboard');
    });
  };

  const otpInputHandler = (code: string) => {
    setOtpInputCode(code);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Setup Authenticator App</ModalHeader>
      <ModalBody customClassName="mfa_modal">
        <p className="mfa_modal--subtitle">
          Each time you log in, in addition to your password, you'll use an
          authenticator app to generate a one-time
        </p>

        <p className="mfa_modal--step">
          <span>Step 1.</span> Scan QR code
        </p>

        <p className="mfa_modal--description">
          Scan the QR code below or manually enter the secret key into your
          authenticator app.
        </p>

        <section className="mfa_modal--qr">
          <div className="mfa_modal--qr--img">
            <img src={qrCodeUrl} alt="mfa qr code image" />
          </div>

          <div className="mfa_modal--qr--key">
            <p className="mfa_modal--qr--key--title">Can't scan QR code?</p>
            <p className="mfa_modal--qr--key--subtitle">
              Enter this secret instead:
            </p>

            <div className="mfa_modal--qr--key--input">
              <TextInput readOnly value={secret} />
            </div>

            <Button size="icon" onClick={copyHandler}>
              Copy code
            </Button>
          </div>
        </section>

        <p className="mfa_modal--step">
          <span>Step 2.</span> Get verfication Code
        </p>

        <p className="mfa_modal--description">
          Enter the 6-digit code you see in your authenticator app.
        </p>

        <p className="mfa_modal--step">
          <span>Step 3.</span> Enter the code
        </p>

        <div className="mfa_modal--otp">
          <OtpInput length={6} onChange={otpInputHandler} />
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

export default MfaModal;
