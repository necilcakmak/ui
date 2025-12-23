import { ApiResponse } from "./types/apiResponse";
import { PostDto, CreatePostPayload, UpdatePostPayload } from "./types/post";
import {
  CategoryDto,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./types/category";
import { LoginDto, RegisterDto } from "./types/auth";
import { AuthResponseDto, UserDto } from "./types/user";

// ÖNEMLİ: Gerçek istek atan fonksiyonları buradan alıyoruz
import { getData, postData, putData, deleteData } from "@/lib/apiService";

const POSTS_ENDPOINT = "Posts";
const CATEGORIES_ENDPOINT = "Categories";
const USERS_ENDPOINT = "Users";

// AUTH
export const login = (payload: LoginDto) =>
  postData<AuthResponseDto>("auth/login", payload);
export const register = (payload: RegisterDto) =>
  postData<AuthResponseDto>("auth/register", payload);
export const logout = () => getData("auth");

// POSTS
export const getPosts = (): Promise<ApiResponse<PostDto[]>> =>
  getData<PostDto[]>(POSTS_ENDPOINT);
export const getPostById = (id: number): Promise<ApiResponse<PostDto>> =>
  getData<PostDto>(`${POSTS_ENDPOINT}/${id}`);
export const getPostByCategoryId = (id: number): Promise<ApiResponse<PostDto[]>> =>
  getData<PostDto[]>(`${POSTS_ENDPOINT}/${id}/posts`);
export const createPost = (payload: CreatePostPayload) =>
  postData<number>(POSTS_ENDPOINT, payload);
export const deletePost = (id: number) =>
  deleteData<null>(`${POSTS_ENDPOINT}/${id}`);
export const updatePost = (payload: UpdatePostPayload) =>
  putData<null>(POSTS_ENDPOINT, payload);

// CATEGORIES
export const getCategories = (): Promise<ApiResponse<CategoryDto[]>> =>
  getData<CategoryDto[]>(CATEGORIES_ENDPOINT);
export const getCategoryById = (
  id: number
): Promise<ApiResponse<CategoryDto>> =>
  getData<CategoryDto>(`${CATEGORIES_ENDPOINT}/${id}`);
export const createCategory = (payload: CreateCategoryPayload) =>
  postData<number>(CATEGORIES_ENDPOINT, payload);
export const updateCategory = (payload: UpdateCategoryPayload) =>
  putData<null>(CATEGORIES_ENDPOINT, payload);
export const deleteCategory = (id: number) =>
  deleteData<null>(`${CATEGORIES_ENDPOINT}/${id}`);

// USERS
export const getUsers = (): Promise<ApiResponse<UserDto[]>> =>
  getData<UserDto[]>(USERS_ENDPOINT);
export const getUserById = (id: number): Promise<ApiResponse<UserDto>> =>
  getData<UserDto>(`${USERS_ENDPOINT}/${id}`);
export const deleteUser = (id: number) =>
  deleteData<null>(`${USERS_ENDPOINT}/${id}`);