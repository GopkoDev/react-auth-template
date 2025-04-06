import { JSX } from 'react';
import './RegistrationPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { registration } from '../../../../../api/auth';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';
import { getApiErrorMessage } from '../../../../../lib/apiError';

const registrationSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .nonempty('Email is required'),
    name: z
      .string()
      .min(4, 'Name must be at least 2 characters long')
      .max(20, 'Name must be at most 20 characters long')
      .optional(),
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

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const RegistrationPageContent = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });
  const navigate = useNavigate();
  const { addToast } = useToast();

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = data;

      const response = await registration(payload);
      if (response.path) {
        navigate(response.path);
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
      console.warn('Registration failed:', error);
    }
  };

  return (
    <section className="registration_page">
      <h1 className="registration_page--title">Create new account</h1>
      <h3 className="registration_page--subtitle">
        Or{' '}
        <Link className="registration_page--subtitle--link" to="/login">
          log in to your account
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

            <Label errorText={errors.name?.message} title="Name">
              <TextInput
                {...register('name')}
                isErrored={!!errors.name}
                autoFocus
                placeholder="Alex"
              />
            </Label>

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
          </Card.Body>
          <Card.Footer>
            <Button buttonType="submit" width="100%">
              Sign Up
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
