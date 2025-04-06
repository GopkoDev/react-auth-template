import { JSX } from 'react';
import './PrivateLayout.scss';

interface PrivateLayoutProps {
  customClassName?: string;
  children: React.ReactNode;
}

export const PrivateLayout = ({
  customClassName,
  children,
}: PrivateLayoutProps): JSX.Element => {
  return (
    <main className={`private_layout ${customClassName}`}>{children}</main>
  );
};
