export interface Post {
  id: string;
  title: string;
  description?: string;
  author: string;
  createdAt: string;
  tags?: string[];
  likes?: number;
  views?: number;
  thumbnailUrl?: string;
  authorImageUrl?: string;
}
