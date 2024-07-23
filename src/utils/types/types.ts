export interface IGame {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  developerId: IUser;
  platformLinks: { platform: string; url: string }[];
  releaseDate: Date;
  categories: string[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  socialNetworks: { platform: string; url: string }[];
  gamesId: IGame[];
  birthDate: Date;
  refreshTokens: string[];
}
