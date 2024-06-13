export interface IRating {
  id: string;
  user: {
    id: string;
    name: string;
  };
  order: {
    id: string;
  };
  rating: number;
  comment: string;
}
