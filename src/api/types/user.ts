import { PostDto } from "./post";

export interface UserSettingDto {
  newBlog: boolean;
  receiveMail: boolean;
}

export interface UserDto {
  id: number; 
  userName?: string;
  email?: string;
  roleName: string;
  createdDate: string;
  updatedDate: string; 
  posts?: PostDto;
}

export interface AuthResponseDto {
  userId: number;
  username: string;
  email: string;
  role: string;
  token: string; 
  tokenExpiration: string; 
}
