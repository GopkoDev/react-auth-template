import { forwardRef, JSX } from 'react';
import './Button.scss';

type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'icon' | 'default';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  buttonType?: ButtonType;
  onClick?: () => void;
  width?: string;
  size?: ButtonSize;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      disabled = false,
      buttonType = 'button',
      onClick = () => {},
      width = undefined,
      size = 'default',
      className = '',
    },
    ref
  ): JSX.Element => {
    const additionalStyles = width ? { width } : {};
    const sizeClass = `button--${size}`;
    const variantClass = `button--${variant}`;

    return (
      <button
        ref={ref}
        className={`button ${variantClass} ${sizeClass} ${className}`}
        type={buttonType}
        disabled={disabled}
        onClick={onClick}
        style={additionalStyles}
      >
        {children}
      </button>
    );
  }
);
