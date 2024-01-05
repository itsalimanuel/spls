type Data = {
  id: number;
  name: string;
  points: number | string;
  mutliplier: number | string;
  score: number;
};
type Players = {
  [key: string]: Data;
};

export type { Players };
