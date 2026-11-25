// types/site.ts
export interface HeroSettings {
  mediaType: 'image' | 'video';
  mediaUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface AboutSettings {
  text: string;
  buttonText: string;
  buttonLink: string;
}

export interface CtaSettings {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface SiteColors {
  primary: string;        // e.g. "#FD3F92" or "pink-500"
  primaryHover?: string;
}

export interface SiteSettings {
  _id?: string;
  businessName: string;
  logoUrl: string;
  colors: SiteColors;
  hero: HeroSettings;
  about: AboutSettings;
  cta: CtaSettings;
  updatedAt?: string;
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  isFeatured: boolean;
  order?: number;
  createdAt?: string;
}