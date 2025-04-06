import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPasswordPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPassword } from '../../../../../api/auth';
import { getApiErrorMessage } from '../../../../../lib/apiError';

import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPageContent = (): JSX.Element => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      const response = await forgotPassword(data);
      if (response.path) {
        addToast('A password reset link has been sent to your email address.');
        navigate(response.path);
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      addToast(errorMessage, 'error');
      console.warn('Registration failed:', error);
    }
  };

  return (
    <section className="forgot_passwor_page">
      <h1 className="forgot_passwor_page--title">Password reset</h1>
      <h3 className="forgot_passwor_page--subtitle">
        <Link className="forgot_passwor_page--subtitle--link" to="/login">
          Back to login
        </Link>
      </h3>

      <Card width="450px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Subtitle>
              Enter your email address to receive a password reset link.
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
          </Card.Body>
          <Card.Footer>
            <Button disabled={isSubmitting} buttonType="submit" width="100%">
              Send reset link
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
