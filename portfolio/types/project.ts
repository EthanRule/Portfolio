export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[];
  video?: string;
  githubUrl?: string;
  websiteUrl?: string;
  isPrivate?: boolean;
}
