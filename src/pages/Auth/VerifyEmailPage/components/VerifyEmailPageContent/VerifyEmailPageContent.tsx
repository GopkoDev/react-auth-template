import { JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './VerifyEmailPageContent.scss';

import { resendVerifyEmail, verifyEmail } from '../../helpers/api';
import { getApiErrorMessage } from '../../../../../lib/apiError';

import { Card } from '../../../../../UI/components/Card/Card';
import { OtpInput } from '../../../../../UI/inputs/OtpInput/OtpInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';

export const VerifyEmailPageContent = (): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { addToast } = useToast();

  const resend = async () => {
    if (email) {
      try {
        const data = await resendVerifyEmail({ email });
        navigate(data.path);
        addToast('Verification email resent successfully');
      } catch (error) {
        const errorMessage = getApiErrorMessage(error);
        addToast(errorMessage, 'error');
        console.warn('Resend email verification error:', error);
      }
    } else {
      addToast('Email not provided', 'error');
    }
  };

  const onInputChange = async (value: string) => {
    if (value.length === 6 && token) {
      try {
        const response = await verifyEmail({ token, pin: value });
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          window.location.href = '/';
        }
      } catch (error) {
        const errorMessage = getApiErrorMessage(error);
        addToast(errorMessage, 'error');
        console.warn('Email verification error:', error);
      }
    }
  };

  return (
    <section className="verify_email_page">
      <Card width="600px">
        <Card.Header>
          <Card.Title>Сonfirm your email</Card.Title>
          <Card.Subtitle>
            We have sent a confirmation pin to your {email} email address.
            Please check your inbox and write the pin in the field below.
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div className="verify_email_page--otp_input">
            <OtpInput length={6} onChange={onInputChange} />
          </div>
          <div className="verify_email_page--subtitle">
            If you didn't receive the email,{' '}
            <p className="verify_email_page--subtitle--link" onClick={resend}>
              click here to resend it
            </p>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button
            width="100%"
            variant="outlined"
            onClick={() => navigate('/login')}
          >
            Back to login
          </Button>
        </Card.Footer>
      </Card>
    </section>
  );
};
