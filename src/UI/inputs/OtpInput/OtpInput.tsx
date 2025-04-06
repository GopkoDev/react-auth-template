import React, { useState, useRef } from 'react';
import './OtpInput.scss';

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  disabled,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Беремо тільки останній символ
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Перехід до наступного поля
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];

    pastedData.split('').forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Переміщення фокусу на останній заповнений інпут
    const lastFilledIndex = Math.min(pastedData.length, length) - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="otp_input">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp_input--field"
          autoFocus={index === 0}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
