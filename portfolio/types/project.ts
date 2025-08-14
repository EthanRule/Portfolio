export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  isPrivate?: boolean;
}
