import { JSX, useState } from 'react';
import './ResetPassworPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card } from '../../../../../UI/components/Card/Card';
import { OtpInput } from '../../../../../UI/inputs/OtpInput/OtpInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../../UI/components/Button/Button';
import { Label } from '../../../../../UI/components/Label/Label';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { resetPassword } from '../../../../../api/auth';

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
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassworFormValues>({
    resolver: zodResolver(resetPassworSchema),
  });

  const onInputChange = async (value: string) => {
    if (value.length === 6) {
      setPinValue(value);
    }
  };

  const onSubmit = async (data: ResetPassworFormValues) => {
    if (!token || !pivValue) return;

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
              <OtpInput length={6} onChange={onInputChange} />
            </div>

            <Label errorText={errors.password?.message} title="Password">
              <PasswordInput
                {...register('password')}
                isErrored={!!errors.password}
                minLength={8}
                minLengthIndicator
              />
            </Label>

            <Label errorText={errors.confirmPassword?.message} title="Password">
              <PasswordInput
                {...register('confirmPassword')}
                isErrored={!!errors.confirmPassword}
              />
            </Label>

            <div className="reset_passwor_page--subtitle">
              If you didn't receive the email,{' '}
              <Link
                className="reset_passwor_page--subtitle--link"
                to="/resend-email"
              >
                click here to resend it
              </Link>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button width="100%" buttonType="submit">
              Reset password
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
