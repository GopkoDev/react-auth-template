import { Link } from 'react-router-dom';
import './PasswordInput.scss';
import React, { forwardRef, JSX, useState } from 'react';

export interface PasswordInputProps {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  isErrored?: boolean;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  minLengthIndicator?: boolean;
  forgotPassword?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      placeholder = '',
      disabled = false,
      name = '',
      maxLength = undefined,
      minLength = undefined,
      readOnly = false,
      autoFocus = false,
      isErrored = false,
      onInput = () => {},
      onChange = () => {},
      onFocus = () => {},
      onBlur = () => {},
      className = '',
      minLengthIndicator = false,
      forgotPassword = false,
    },
    ref
  ): JSX.Element => {
    const [value, setValue] = useState<string>('');
    const percentage =
      minLength && value ? Math.min(100, (value.length / minLength) * 100) : 0;

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onInput(event);
    };

    return (
      <div className="password_input">
        <input
          ref={ref}
          className={`password_input--input ${
            isErrored ? 'password_input--input--error' : ''
          } ${forgotPassword ? 'with_button' : ''} ${className}`}
          type="password"
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onInput={handleInput}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {Boolean(forgotPassword) && typeof forgotPassword === 'string' && (
          <Link to={forgotPassword} className="password_input--forgot_password">
            Forgot Password?
          </Link>
        )}
        {minLengthIndicator && minLength && (
          <div className="password_input--indicator">
            {Array.from({ length: 4 }).map((_, index) => {
              const start = index * 25;
              const blockPercentage = Math.max(
                0,
                Math.min(100, ((percentage - start) / 25) * 100)
              );

              return (
                <div
                  key={index}
                  className="password_input--indicator--block"
                  style={{
                    background: `linear-gradient(to right, var(--primary) ${blockPercentage}%, var(--muted) ${blockPercentage}%)`,
                  }}
                ></div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
