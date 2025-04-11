import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
}

export const SEO = ({ title }: SEOProps) => {
  const fullTitle = `${title} | Hono Auth`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};
