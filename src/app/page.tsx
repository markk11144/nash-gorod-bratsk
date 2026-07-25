import { company } from "@/data/company";
import { services } from "@/data/services";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Contacts } from "@/components/sections/Contacts";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";

function structuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": "#organization",
    name: company.name,
    legalName: company.legalName,
    description: company.description,
    telephone: company.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.office.streetAddress,
      addressLocality: company.office.locality,
      addressRegion: company.office.region,
      postalCode: company.office.postalCode,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.coordinates.latitude,
      longitude: company.coordinates.longitude,
    },
    sameAs: [company.links.vk, company.links.domclick],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.rating.value,
      bestRating: 5,
      worstRating: 1,
      ratingCount: company.rating.ratingCount,
      reviewCount: company.rating.reviewCount,
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.description },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Главная", item: "/" }],
  };
  return [business, breadcrumbs];
}

export default function HomePage() {
  return (
    <main id="content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }} />
      <Hero />
      <Services />
      <Benefits />
      <About />
      <Team />
      <Reviews />
      <Faq />
      <Contacts />
    </main>
  );
}
