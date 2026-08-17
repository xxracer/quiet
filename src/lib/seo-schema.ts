import { Product } from "@/lib/products";

const BASE_URL = "https://quietwaredishes.com";
const BRAND_NAME = "QuietWare Dishes";
const BRAND_TAGLINE =
  "Premium noise-free dinnerware engineered with acoustic dampening technology for peaceful dining in American homes.";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: "QuietWare",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: BRAND_TAGLINE,
    sameAs: [
      "https://www.facebook.com/quietwaredishes",
      "https://www.instagram.com/quietwaredishes",
      "https://www.youtube.com/channel/UCMjxPrOzEhZM6f1as6bpFBw",
      "https://www.linkedin.com/in/justin-szilagyi-020b771b1",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-QUIET-PLATE",
      contactType: "Customer Service",
      email: "info@quietwaredishes.com",
      availableLanguage: "English",
      areaServed: "US",
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: BRAND_NAME,
    description: BRAND_TAGLINE,
    url: BASE_URL,
    image: `${BASE_URL}/og-image.jpg`,
    priceRange: "$ - $$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ohio",
      addressRegion: "OH",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.4173,
      longitude: -82.9071,
    },
    telephone: "+1-800-QUIET-PLATE",
    email: "info@quietwaredishes.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://www.facebook.com/quietwaredishes",
      "https://www.instagram.com/quietwaredishes",
      "https://www.youtube.com/channel/UCMjxPrOzEhZM6f1as6bpFBw",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50000",
      bestRating: "5",
      worstRating: "1",
    },
    brand: {
      "@type": "Brand",
      name: "QuietWare",
      description: BRAND_TAGLINE,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Quiet Dinnerware",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dinner Plates" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bowls" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Side Plates" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dinner Sets" } },
      ],
    },
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    sku: product.id,
    mpn: `QW-${product.id}`,
    gtin13: "1234567890123",
    brand: {
      "@type": "Brand",
      name: "QuietWare",
      description: BRAND_TAGLINE,
      url: BASE_URL,
    },
    category: `Quiet ${product.category.replace("-", " ")}`,
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/products/${product.slug}`,
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability:
        product.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
        url: BASE_URL,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.price >= 50 ? "0" : "8.99",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 0,
      reviewCount: product.reviews || 0,
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "noiseReduction",
        value: product.specifications.noiseReduction,
      },
      {
        "@type": "PropertyValue",
        name: "material",
        value: product.specifications.material,
      },
      {
        "@type": "PropertyValue",
        name: "countryOfOrigin",
        value: "United States",
      },
      {
        "@type": "PropertyValue",
        name: "dishwasherSafe",
        value: product.specifications.dishwasherSafe ? "Yes" : "No",
      },
    ],
    isRelatedTo: [
      {
        "@type": "Product",
        name: "Traditional Ceramic Plates",
        description: "Standard ceramic dinnerware without acoustic dampening technology",
      },
    ],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCollectionPageSchema(title: string, description: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}/products`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };
}
