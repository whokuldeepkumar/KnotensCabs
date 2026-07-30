export interface CabServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  priceUnit: string;
  features: string[];
  popularRoutes?: { origin: string; destination: string; price: number }[];
}
