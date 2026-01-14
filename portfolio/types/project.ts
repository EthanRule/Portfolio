export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  websiteUrl?: string;
  isPrivate?: boolean;
}
