export interface Post {
  data: {
    title: string;
    date: string;
    description: string;
    image: string;
    tags: string[];
  };
  slug: string;
}