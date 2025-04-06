import { JSX } from 'react';
import { Link } from 'react-router-dom';
import './LoginPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '../../../../../api/auth';
import { getApiErrorMessage } from '../../../../../lib/apiError';

import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
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

  return (
    <section className="login_page">
      <h1 className="login_page--title">Sign in to your account</h1>
      <h3 className="login_page--subtitle">
        Or{' '}
        <Link className="login_page--subtitle--link" to="/registration">
          create a new account
        </Link>
      </h3>

      <Card width="450px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Title>Sign In</Card.Title>
            <Card.Subtitle>
              Enter your credentials to access your account
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Label errorText={errors.email?.message} title="Email">
              <TextInput
                {...register('email')}
                isErrored={!!errors.email}
                autoFocus
                placeholder="email@example.com"
              />
            </Label>

            <Label errorText={errors.password?.message} title="Password">
              <PasswordInput
                {...register('password')}
                isErrored={!!errors.password}
                forgotPassword="/forgot-password"
              />
            </Label>
          </Card.Body>
          <Card.Footer>
            <Button buttonType="submit" width="100%">
              Sign In
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
