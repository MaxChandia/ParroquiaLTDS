export interface Noticia {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
  images: NoticiaImages[];
  authorId?: string;
}

export interface NoticiaImages {
  id: number;
  s3Key: string;
  url: string;
  isCover: boolean;
  postId: number;
  createdAt: string;
}