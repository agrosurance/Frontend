export interface Land {
  name: string;
  crop?: {
    name: string;
    imageUrl: string;
  };
  insurance:
    | {
        isInsured: false;
      }
    | { isInsured: true; insuredTill: number };
  location: {
    latitude: number;
    longitude: number;
  };
  area: number;
}
