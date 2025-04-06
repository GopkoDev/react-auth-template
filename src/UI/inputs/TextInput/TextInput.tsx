import './TextInput.scss';
import React, { forwardRef, JSX } from 'react';

export interface TextInputProps {
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
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder = '',
      disabled = false,
      name = '',
      value,
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
    },
    ref
  ): JSX.Element => {
    return (
      <input
        ref={ref}
        className={`text_input ${
          isErrored ? 'text_input--error' : ''
        } ${className}`}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onInput={onInput}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);
