import { JSX } from 'react';
import './Label.scss';

interface LabelProps {
  children: React.ReactNode;
  title: string;
  errorText?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  title = '',
  errorText = '',
  className = '',
}): JSX.Element => {
  return (
    <label className={`label ${className}`}>
      <p className="label--title">{title}</p>

      {children}

      {errorText && <p className="label--error">{errorText}</p>}
    </label>
  );
};
