import React, { JSX } from 'react';
import './SwitchButton.scss';

interface SwitcherProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switcher = ({
  isChecked,
  onChange,
  label = '',
  disabled = false,
}: SwitcherProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`switcher ${disabled ? 'disabled' : ''}`}>
      <label className="switcher--label">
        <input
          type="checkbox"
          className="switcher--input"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="switcher--slider" />
        {label}
      </label>
    </div>
  );
};
