import { Product } from "@/lib/products";

export function generateProductSchema(product: Product) {
  const savings = product.comparePrice
    ? ((Number(product.comparePrice) - product.price) / Number(product.comparePrice)) * 100
    : 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "QuietWare Dishes",
        url: "https://quietwaredishes.com",
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
          "@type": "QueryTimes",
          handlingTime: {
            "@type": "Duration",
            duration: "P1D",
          },
          transitTime: {
            "@type": "Duration",
            duration: "P3D",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: "5",
      worstRating: "1",
    },
    brand: {
      "@type": "Brand",
      name: "QuietWare",
      description:
        "Premium noise-free dinnerware engineered with acoustic dampening technology for peaceful dining in American homes.",
      url: "https://quietwaredishes.com",
    },
    category: `Quiet ${product.category.replace("-", " ")}`,
    sku: product.id,
    mpn: `QW-${product.id}`,
    gtin13: "1234567890123",
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
    ],
    isSimilarTo: [
      {
        "@type": "Product",
        name: "Traditional Ceramic Plates",
        description:
          "Standard ceramic dinnerware without acoustic dampening technology",
      },
    ],
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "US",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "QuietWare Dishes",
    description:
      "Premium noise-free dinnerware engineered with acoustic dampening technology. Made in the USA with sustainable, non-toxic materials.",
    url: "https://quietwaredishes.com",
    image: "https://quietwaredishes.com/og-image.jpg",
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
    email: "support@quietwaredishes.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://www.facebook.com/quietwaredishes",
      "https://www.instagram.com/quietwaredishes",
      "https://twitter.com/quietwaredishes",
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
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Quiet Dinnerware",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Dinner Plates",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Bowls",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Dinner Sets",
          },
        },
      ],
    },
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does QuietWare's noise reduction technology work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our plates are engineered with a proprietary acoustic dampening core sandwiched between layers of premium ceramic. This technology absorbs vibrations and significantly reduces the sound of clattering dishes, silverware, and glass contact.",
        },
      },
      {
        "@type": "Question",
        name: "Are QuietWare plates durable and chip-resistant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our plates are made from high-fired ceramic composite that passes rigorous impact resistance tests. They are significantly more chip-resistant than traditional ceramic or porcelain while maintaining an elegant, slim profile.",
        },
      },
      {
        "@type": "Question",
        name: "How long does shipping take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We ship from our US-based warehouses. Standard shipping (3-5 business days) is free on orders over $50. Express shipping (1-2 business days) is available at checkout. All orders include tracking.",
        },
      },
      {
        "@type": "Question",
        name: "What is your return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, return the items in original condition for a full refund. We also provide a 5-year warranty against manufacturing defects.",
        },
      },
      {
        "@type": "Question",
        name: "Are the materials safe and eco-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Our plates are made from 100% non-toxic, food-safe materials. We use sustainable manufacturing processes and our packaging is fully recyclable. QuietWare is committed to reducing environmental impact.",
        },
      },
    ],
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
