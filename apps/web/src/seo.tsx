import { Helmet } from 'react-helmet-async';

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://tishal-et-dudu.local';
const SITE_NAME = 'תשאל את דודו';

export function Seo({
  title,
  description,
  canonicalPath = '/',
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
}) {
  const canonical = `${SITE_URL}${canonicalPath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/og.svg`;
  
  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'תשאל את דודו – אתר יד שנייה ללא מטרות רווח. מוצרים משופצים במחירים זולים, מסירת מוצרים לנזקקים, ריהוט, מוצרי חשמל, חפצי בית. יוזמה חברתית עם לב גדול.',
    inLanguage: 'he-IL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/publish`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index,follow" />
      <meta name="author" content={SITE_NAME} />
      <meta name="keywords" content="יד שנייה, מוצרים משופצים, מחירים זולים, מסירת מוצרים לנזקקים, ריהוט, מוצרי חשמל, חפצי בית, יוזמה חברתית, ללא מטרות רווח, תשאל את דודו, דודו, אילת" />
      <meta name="language" content="Hebrew" />
      <meta name="geo.region" content="IL" />
      <meta name="geo.placename" content="אילת" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}


