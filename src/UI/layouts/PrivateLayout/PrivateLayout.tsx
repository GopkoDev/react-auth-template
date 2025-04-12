import { JSX } from 'react';
import './PrivateLayout.scss';
import { SEO } from '../../components/Seo/Seo';
import { LeftNavbar } from '../../components/LeftNavbar/LeftNavbar';

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
      <main className={`private_layout ${customClassName}`}>
        <LeftNavbar />
        <section className="private_layout--content ">{children}</section>
      </main>
    </>
  );
};
