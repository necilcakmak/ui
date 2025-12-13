import { CategoryReferenceDto } from "./category";
import { UserDto } from "./user";

export interface PostDto {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: UserDto;
  createdDate: string; 
  categoryId: number;
  category: CategoryReferenceDto;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  categoryId: number;
}

export interface UpdatePostPayload {
  id: number;
  title: string;
  content: string;
  categoryId: number;
}
