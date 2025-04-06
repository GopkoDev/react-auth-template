import { JSX } from 'react';
import './PublicLayout.scss';

interface PublicLayoutProps {
  customClassName?: string;
  children: React.ReactNode;
}

export const PublicLayout = ({
  customClassName,
  children,
}: PublicLayoutProps): JSX.Element => {
  return <main className={`public_layout ${customClassName}`}>{children}</main>;
};
