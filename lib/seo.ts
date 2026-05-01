export const SITE_NAME = "Taqueria Ibarra Food Truck";

export const HOME_TITLE =
  "Taqueria Ibarra Food Truck | Kansas City Mexican Food";

export const HOME_DESCRIPTION =
  "Order tacos, burritos, tortas, quesadillas, and more from Taqueria Ibarra Food Truck in Kansas City.";

const SITE_URL_PLACEHOLDER = "https://www.taqueriaibarrakc.com";

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  name: "Taqueria Ibarra Food Truck",
  alternateName: "Taqueria Ibarra",
  telephone: "+1-816-585-2257",
  url: SITE_URL_PLACEHOLDER,
  image: "/images/brand/open-graph.webp",
  servesCuisine: "Mexican",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5005 North Brighton Avenue",
    addressLocality: "Kansas City",
    addressRegion: "MO",
    postalCode: "64117",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.17,
    longitude: -94.52,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "11:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "21:30",
    },
  ],
  sameAs: [SITE_URL_PLACEHOLDER],
};
