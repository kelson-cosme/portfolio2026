import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title = "Kelson Cosme | Developer & UI/UX Designer", 
  description = "Desenvolvedor Full-stack e Designer focado em criar Máquinas de Vendas digitais. Transformo ideias em interfaces de alta performance.",
  keywords = "desenvolvedor web, ui/ux design, react, next.js, kelson cosme, portfólio, frontend, sites de alta conversão",
  image = "/perfil.webp", // Certifique-se que esta imagem existe em public/
  url = "https://kelsoncosme.com" // Substitua pelo seu domínio real quando tiver
}: SEOProps) {
  
  const siteTitle = title === "Kelson Cosme | Developer & UI/UX Designer" ? title : `${title} | Kelson Cosme`;

  // Schema.org para "Person" - Isto diz ao Google quem você é profissionalmente
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kelson Cosme",
    "url": url,
    "sameAs": [
      "https://www.linkedin.com/in/kelson-cosme", // Coloque seus links reais
      "https://github.com/kelson-cosme",
      "https://www.instagram.com/kelsoncosme.dev"
    ],
    "jobTitle": "Senior Frontend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelancer"
    },
    "description": description,
    "image": `${url}${image}`
  };

  return (
    <Helmet>
      {/* Dados Básicos */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* JSON-LD Estruturado para o Google */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}