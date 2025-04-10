import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { registration } from '../../helpers/api';
import { getApiErrorMessage } from '../../../../../lib/apiError';

import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { PasswordInput } from '../../../../../UI/inputs/PasswordInput/PasswordInput';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';

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
  const navigate = useNavigate();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = data;

      const response = await registration(payload);
      if (response.success) {
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
      <h1 className="registration_page--title">Sign Up</h1>

      <Card width="400px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Subtitle>
              Fill in your details to create a new account
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

            <Label errorText={errors.name?.message} title="Name">
              <TextInput
                {...register('name')}
                isErrored={!!errors.name}
                disabled={isSubmitting}
                autoFocus
                placeholder="Alex"
              />
            </Label>

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
            <Button disabled={isSubmitting} buttonType="submit" width="100%">
              Sign Up
            </Button>
          </Card.Footer>
        </form>
      </Card>

      <h3 className="registration_page--subtitle">
        Or{' '}
        <Link className="registration_page--subtitle--link" to="/login">
          log in to your account
        </Link>
      </h3>
    </section>
  );
};
