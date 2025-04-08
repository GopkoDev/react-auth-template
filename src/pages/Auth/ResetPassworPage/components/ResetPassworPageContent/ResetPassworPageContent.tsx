import { JSX, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassworPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { getApiErrorMessage } from '../../../../../lib/apiError';
import { resetPassword } from '../../helpers/api';

import { Card } from '../../../../../UI/components/Card/Card';
import { OtpInput } from '../../../../../UI/inputs/OtpInput/OtpInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { Label } from '../../../../../UI/components/Label/Label';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';

const resetPassworSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      });
    }
  });

type ResetPassworFormValues = z.infer<typeof resetPassworSchema>;

export const ResetPassworPageContent = (): JSX.Element => {
  const [pivValue, setPinValue] = useState<string>('');
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassworFormValues>({
    resolver: zodResolver(resetPassworSchema),
  });

  const onSubmit = async (data: ResetPassworFormValues) => {
    if (!token) return;

    if (!pivValue || (pivValue && pivValue.length !== 6)) {
      addToast('Please enter the pin code', 'error');
      return;
    }

    try {
      const response = await resetPassword({
        token,
        pin: pivValue,
        password: data.password,
      });
      if (response.message === 'Password reset successfully') {
        localStorage.setItem('accessToken', response.accessToken);
        navigate('/login');
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
      console.warn('Reset password failed:', error);
    }
  };
  return (
    <section className="reset_passwor_page">
      <Card width="450px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Title>Сreate new password</Card.Title>
            <Card.Subtitle>
              We have sent a confirmation pin to your email address. Please
              check your inbox and write the pin in the field below.
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <div className="reset_passwor_page--otp_input">
              <OtpInput
                length={6}
                onChange={(value: string) => setPinValue(value)}
                disabled={isSubmitting}
              />
            </div>

            <Label errorText={errors.password?.message} title="Password">
              <PasswordInput
                {...register('password')}
                isErrored={!!errors.password}
                disabled={isSubmitting}
                minLength={8}
                minLengthIndicator
              />
            </Label>

            <Label errorText={errors.confirmPassword?.message} title="Password">
              <PasswordInput
                {...register('confirmPassword')}
                isErrored={!!errors.confirmPassword}
                disabled={isSubmitting}
              />
            </Label>
          </Card.Body>
          <Card.Footer>
            <Button disabled={isSubmitting} width="100%" buttonType="submit">
              Reset password
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
