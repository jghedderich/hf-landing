import agroshowThumbnail from '../assets/agroshow/thumbnail.png';
import agroshowHero from '../assets/agroshow/hero.png';
import agroshowSearch from '../assets/agroshow/search.png';
import terepaimaAdmin from '../assets/terepaima/admin-dashboard.png';
import terepaimaOwner from '../assets/terepaima/owner-dashboard.png';
import type { ImageMetadata } from 'astro';

export type CaseStudyImages = {
  card: ImageMetadata;
  hero: ImageMetadata;
  gallery: ImageMetadata[];
};

export const caseStudyImages: Record<string, CaseStudyImages> = {
  agroshow: {
    card: agroshowThumbnail,
    hero: agroshowHero,
    gallery: [agroshowSearch],
  },
  terepaima: {
    card: terepaimaAdmin,
    hero: terepaimaAdmin,
    gallery: [terepaimaOwner],
  },
};
