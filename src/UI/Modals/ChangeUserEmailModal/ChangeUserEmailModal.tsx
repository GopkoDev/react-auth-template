import './ChangeUserEmailModal.scss';
import { JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { OtpInput } from '../../inputs/OtpInput/OtpInput';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/Modal/Modal';

const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface ChangeUserEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmMail: (email: string) => Promise<{ success: boolean }>;
  onConfirmPin: (pin: string) => Promise<void>;
}

const ChangeUserEmailModal = ({
  isOpen,
  onClose,
  onConfirmMail,
  onConfirmPin,
}: ChangeUserEmailModalProps): JSX.Element => {
  const [step, setStep] = useState<'email' | 'pin'>('email');
  const [pin, setPin] = useState<string>('');
  const title = step === 'email' ? 'Change Email' : 'Verify Email';
  const submitButtonText = step === 'email' ? 'Send Verification' : 'Confirm';

  const { register, formState, handleSubmit } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleEmailSubmit = async (data: EmailFormData) => {
    const { success } = await onConfirmMail(data.email);
    if (!success) {
      return;
    }
    setStep('pin');
  };

  const onPinInputChange = (value: string) => {
    if (value.length === 6) {
      setPin(value);
    }
  };

  const handlePinSubmit = async () => {
    await onConfirmPin(pin);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody customClassName="change_email_modal">
        {step === 'email' ? (
          <>
            <p className="change_email_modal--subtext">
              Enter your new email address. We'll send a verification code to
              confirm the change.
            </p>
            <form onSubmit={handleSubmit(handleEmailSubmit)}>
              <Label
                title="New Email"
                errorText={formState.errors.email?.message}
              >
                <TextInput
                  placeholder="NewEmail@example.com"
                  {...register('email')}
                  autoFocus
                  isErrored={!!formState.errors.email}
                />
              </Label>
            </form>
          </>
        ) : (
          <>
            <p className="change_email_modal--subtext">
              We've sent a 6-digit verification code to your new email address.
              Enter it below to complete the change.
            </p>

            <div className="change_email_modal--otp_input">
              <OtpInput length={6} onChange={onPinInputChange} />
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={
            step === 'email' ? handleSubmit(handleEmailSubmit) : handlePinSubmit
          }
          buttonType="submit"
        >
          {submitButtonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangeUserEmailModal;
