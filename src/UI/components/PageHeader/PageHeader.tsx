import { JSX } from 'react';

interface PageHeaderProps {
  pageName?: string;
}

export const PageHeader = ({ pageName }: PageHeaderProps): JSX.Element => {
  return <section className="page_header logo_header">{pageName}</section>;
};
