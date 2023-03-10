export interface PostDetail {
  id: string;
  title: string;
  meta: string;
  slug: string;
  tags: string[];
  thumbnail?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: "user" | "admin";
}
