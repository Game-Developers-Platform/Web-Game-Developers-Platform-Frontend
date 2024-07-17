export interface IGame {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: string;
  platformLinks: { platform: string; url: string }[];
  releaseDate: Date;
  views: number;
  categories: string[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: string[];
  birthDate: Date;
  views: number;
  refreshTokens: string[];
}
