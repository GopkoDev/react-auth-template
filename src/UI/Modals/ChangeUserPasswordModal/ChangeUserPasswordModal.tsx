import { JSX } from 'react';
import './ChangeUserPasswordModal.scss';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import { PasswordInput } from '../../inputs/PasswordInput/PasswordInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '../../inputs/Checkbox/Checkbox';

interface ChangeUserPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: ({
    currentPassword,
    newPassword,
    logoutAllDevices,
  }: {
    currentPassword: string;
    newPassword: string;
    logoutAllDevices?: boolean;
  }) => Promise<void>;
}

const formSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Current password must be at least 8 characters long',
    }),
    newPassword: z.string().min(8, {
      message: 'New password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Confirm password must be at least 8 characters long',
    }),
    logoutAllDevices: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      });
    }

    if (data.newPassword === data.currentPassword) {
      ctx.addIssue({
        path: ['newPassword'],
        code: z.ZodIssueCode.custom,
        message: 'New password must be different from current password',
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const ChangeUserPasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ChangeUserPasswordModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Change Password</ModalHeader>
      <form onSubmit={handleSubmit(onConfirm)}>
        <ModalBody customClassName="change_password_modal_body">
          <p className="change_password_modal_body--description">
            To change your password, please enter your current password for
            security verification and then enter your new password twice to
            confirm.
          </p>

          <Label
            title="Current Password"
            errorText={errors.currentPassword?.message}
          >
            <PasswordInput
              {...register('currentPassword')}
              isErrored={!!errors.currentPassword}
              disabled={isSubmitting}
            />
          </Label>
          <Label title="New Password" errorText={errors.newPassword?.message}>
            <PasswordInput
              minLength={8}
              minLengthIndicator
              {...register('newPassword')}
              isErrored={!!errors.newPassword}
              disabled={isSubmitting}
            />
          </Label>
          <Label
            title="Confirm New Password"
            errorText={errors.confirmPassword?.message}
          >
            <PasswordInput
              {...register('confirmPassword')}
              isErrored={!!errors.confirmPassword}
              disabled={isSubmitting}
            />
          </Label>

          <Checkbox
            label="Logout from all devices"
            {...register('logoutAllDevices')}
            disabled={isSubmitting}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          <Button buttonType="submit">Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ChangeUserPasswordModal;
