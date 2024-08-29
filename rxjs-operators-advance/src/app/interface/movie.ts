export interface IMovie {
  id: number;
  name: string;
  title: string;
  author: string;
  ratings: number;
  price: {
    standard: number;
    deluxe: number;
  };
  releaseDate: string;
  genres: string[];
  cast: string[];
}
