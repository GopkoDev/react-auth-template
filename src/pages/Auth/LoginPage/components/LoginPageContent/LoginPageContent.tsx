import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '../helpers/api';
import { getApiErrorMessage } from '../../../../../lib/apiError';

import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';
import { OtpInput } from '../../../../../UI/inputs/OtpInput/OtpInput';

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPageContent = (): JSX.Element => {
  const { addToast } = useToast();
  const [isMfa, setIsMfa] = useState<boolean>(false);
  const [loginCredentials, setLoginCredentials] =
    useState<LoginFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
      if (response.requiresTwoFactor) {
        setLoginCredentials(data);
        setIsMfa(true);
        return;
      }
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        window.location.href = '/';
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
      console.warn('LoginPageContent error:', error);
    }
  };

  const mfaCodeHandler = async (code: string) => {
    if (!loginCredentials) {
      addToast('Please login first', 'error');
      setIsMfa(false);
      return;
    }

    if (code.length < 6) {
      return;
    }

    try {
      const response = await login({
        ...loginCredentials,
        mfaToken: code,
      });

      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        window.location.href = '/';
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
    }
  };

  return (
    <section className="login_page">
      {!isMfa && (
        <>
          <h1 className="login_page--title">Login</h1>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card.Header>
                <Card.Subtitle>
                  Enter your credentials to access your account
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Label errorText={errors.email?.message} title="Email">
                  <TextInput
                    {...register('email')}
                    isErrored={!!errors.email}
                    disabled={isSubmitting}
                    autoFocus
                    placeholder="email@example.com"
                  />
                </Label>

                <Label errorText={errors.password?.message} title="Password">
                  <PasswordInput
                    {...register('password')}
                    isErrored={!!errors.password}
                    disabled={isSubmitting}
                    forgotPassword="/forgot-password"
                  />
                </Label>
              </Card.Body>
              <Card.Footer>
                <Button
                  disabled={isSubmitting}
                  buttonType="submit"
                  width="100%"
                >
                  Sign In
                </Button>
              </Card.Footer>
            </form>
          </Card>
          <h3 className="login_page--subtitle">
            Or{' '}
            <Link className="login_page--subtitle--link" to="/registration">
              create a new account
            </Link>
          </h3>
        </>
      )}
      {isMfa && (
        <>
          <h1 className="login_page--title">Two-Factor Authentication</h1>
          <h3 className="login_page--subtitle">
            Please enter the verification code from your authenticator app
          </h3>

          <Card>
            <Card.Header>
              <Card.Title>Enter Authentication Code</Card.Title>
              <Card.Subtitle>
                Open your authenticator app to view your verification code
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div className="login_page--mfa_code">
                <OtpInput length={6} onChange={mfaCodeHandler} />
              </div>{' '}
            </Card.Body>
          </Card>
        </>
      )}
    </section>
  );
};
