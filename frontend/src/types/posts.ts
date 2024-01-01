export enum Categories {
  //generate categories for a forum
  General = "General",
  News = "News",
  Events = "Events",
  Sports = "Sports",
  Politics = "Politics",
  Technology = "Technology",
  Entertainment = "Entertainment",
  Music = "Music",
  Fashion = "Fashion",
}
export type postOverview = {
  id: number;
  category: Categories;
  name: string;
  status: "offline" | "online" | "error";
  created_at: Date;
  updated_at: Date;
  description: string;
  environment: "Active" | "Closed";
  content: string;
  user_id: number;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  admin: boolean;
};
