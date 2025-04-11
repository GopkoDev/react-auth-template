import { JSX } from 'react';
import './PrivateLayout.scss';
import { SEO } from '../../components/Seo/Seo';

interface PrivateLayoutProps {
  customClassName?: string;
  children: React.ReactNode;
  pageTitle?: string;
}

export const PrivateLayout = ({
  customClassName = '',
  pageTitle = '',
  children,
}: PrivateLayoutProps): JSX.Element => {
  return (
    <>
      <SEO title={pageTitle} />
      <main className={`private_layout ${customClassName}`}>{children}</main>
    </>
  );
};
