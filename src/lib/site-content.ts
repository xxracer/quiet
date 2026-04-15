// Site content structure - stored in Vercel Blob as JSON
export interface SiteContent {
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    description: string;
    cta1Text: string;
    cta1Link: string;
    cta2Text: string;
    cta2Link: string;
    imageUrl: string;
    images?: string[]; // For carousel (multiple images)
    staticImage?: string; // For single static image
  };
  featuredProducts: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  valueProposition: {
    badge: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  testimonials: Testimonial[];
  faq: FAQ[];
  cta: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    description: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Proudly Made in the USA",
    title1: "Dinnerware",
    title2: "Without",
    title3: "the Noise",
    description: "Engineered with acoustic dampening technology for truly peaceful dining. Join thousands of satisfied customers who chose the #1 quality-price quiet dinnerware brand in America.",
    cta1Text: "Shop Collection",
    cta1Link: "/products",
    cta2Text: "Learn More",
    cta2Link: "/about",
    imageUrl: "https://images.unsplash.com/photo-1615366734858-5d8c6f328d6e?w=1200&h=800&fit=crop",
  },
  featuredProducts: {
    title: "Best Sellers",
    subtitle: "Discover our most loved quiet dinnerware, crafted for those who appreciate peace without compromising on style.",
    ctaText: "View All Products",
  },
  valueProposition: {
    badge: "Why Choose QuietWare",
    title: "The #1 Quality-Price Choice in Quiet Dinnerware",
    description: "We've combined cutting-edge acoustic dampening technology with premium materials to create dinnerware that delivers exceptional quietness without compromising on aesthetics or durability. Our direct-to-consumer model means you get museum-quality plates at a fraction of the cost of traditional premium brands.",
    imageUrl: "https://images.unsplash.com/photo-1615366734858-5d8c6f328d6e?w=800&h=800&fit=crop",
  },
  testimonials: [
    {
      id: "1",
      name: "Sarah M.",
      location: "Austin, TX",
      text: "These plates are incredible! No more clattering sounds when I'm doing dishes at night. Absolutely worth every penny.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: "2",
      name: "James K.",
      location: "Denver, CO",
      text: "Finally, dinnerware that lives up to the hype. The noise reduction is real and the quality is exceptional.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: "3",
      name: "Emily R.",
      location: "Portland, OR",
      text: "I bought these for my elderly parents. They've commented on how much easier and quieter they are to use.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ],
  faq: [
    {
      id: "1",
      question: "How does the noise reduction technology work?",
      answer: "Our proprietary acoustic dampening technology uses a multi-layer ceramic composite that absorbs and dissipates vibrations, reducing noise by up to 90% compared to traditional ceramic plates.",
    },
    {
      id: "2",
      question: "Are they dishwasher safe?",
      answer: "Yes! All QuietWare products are 100% dishwasher safe. The acoustic properties are permanently fused into the ceramic and will not degrade over time or with repeated washing.",
    },
    {
      id: "3",
      question: "Where are these made?",
      answer: "All QuietWare products are proudly manufactured in our facility in Ohio, USA. We source our materials domestically and maintain strict quality control throughout production.",
    },
    {
      id: "4",
      question: "What's your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, return them for a full refund—no questions asked.",
    },
  ],
  cta: {
    title: "Ready for Peaceful Dining?",
    description: "Join thousands of happy customers who chose QuietWare.",
    ctaText: "Shop Now",
    ctaLink: "/products",
  },
  footer: {
    description: "Premium noise-free dinnerware engineered for peaceful dining experiences. Made with love in the USA.",
  },
};
