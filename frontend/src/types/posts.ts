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
  dateCreated: Date;
  description: string;
  environment: "Active" | "Closed";
};
