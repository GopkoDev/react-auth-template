import { JSX } from 'react';
import './VerifyEmailPageContent.scss';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../../../../UI/components/Card/Card';
import { OtpInput } from '../../../../../UI/inputs/OtpInput/OtpInput';
import { Button } from '../../../../../UI/components/Button/Button';
import { verifyEmail } from '../../../../../api/auth';
import { useToast } from '../../../../../UI/components/Toast/ToastProvider';
import { getApiErrorMessage } from '../../../../../lib/apiError';

export const VerifyEmailPageContent = (): JSX.Element => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { addToast } = useToast();
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');

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
            <Link
              className="verify_email_page--subtitle--link"
              to="/resend-email"
            >
              click here to resend it
            </Link>
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
