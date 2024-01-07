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
export type Post = {
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
  comments: Comment[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  admin: boolean;
};

export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: User;
};
