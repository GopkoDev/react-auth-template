import { JSX } from 'react';
import './ForgotPasswordPageContent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../../../../UI/components/Card/Card';
import { Label } from '../../../../../UI/components/Label/Label';
import { TextInput } from '../../../../../UI/inputs/TextInput/TextInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { forgotPassword } from '../../../../../api/auth';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPageContent = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      const response = await forgotPassword(data);
      if (response.path) {
        navigate(response.path);
      }
    } catch (error) {
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
                autoFocus
                placeholder="email@example.com"
              />
            </Label>
          </Card.Body>
          <Card.Footer>
            <Button buttonType="submit" width="100%">
              Send reset link
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </section>
  );
};
