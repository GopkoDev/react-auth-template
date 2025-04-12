import { JSX } from 'react';
import './PublicLayout.scss';
import { SEO } from '../../components/Seo/Seo';

interface PublicLayoutProps {
  customClassName?: string;
  children: React.ReactNode;
  pageTitle?: string;
}

export const PublicLayout = ({
  customClassName = '',
  pageTitle = '',
  children,
}: PublicLayoutProps): JSX.Element => {
  return (
    <>
      <SEO title={pageTitle} />
      <main className={`public_layout ${customClassName} background_image`}>
        {children}
      </main>
      ;
    </>
  );
};
