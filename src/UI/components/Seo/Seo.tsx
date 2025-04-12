import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
}

export const SEO = ({ title }: SEOProps) => {
  const fullTitle = `${title} | Start Template`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};
