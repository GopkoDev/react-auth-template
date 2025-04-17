import { ChangeEvent, forwardRef } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, disabled, name, onBlur }, ref) => {
    return (
      <label className={`checkbox  ${disabled ? 'disabled' : ''}`}>
        <input
          name={name}
          onBlur={onBlur}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          className="checkbox__input"
        />
        <span className="checkbox__checkmark" />
        {label && <span className="checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
