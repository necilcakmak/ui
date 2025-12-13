import { deleteData, getData, postData, putData } from "@/lib/apiService";

import { LoginDto, RegisterDto } from "@/api/types/auth";
import { AuthResponseDto } from "./types/user";

import { ApiResponse } from "./types/apiResponse";
import { CreatePostPayload, PostDto, UpdatePostPayload } from "./types/post";
import {
  CategoryDto,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "./types/category";

const POSTS_ENDPOINT = "Posts";
const CATEGORIES_ENDPOINT = "Categories";

// =========================================================
//                  AUTH COMMANDS (KOMUTLAR)
// =========================================================
export const login = (payload: LoginDto) =>
  postData<AuthResponseDto>("auth/login", payload);
export const register = (payload: RegisterDto) =>
  postData<AuthResponseDto>("auth/register", payload);
export const logout = () => getData("auth");

// =========================================================
//                  POSTS COMMANDS (KOMUTLAR)
// =========================================================
export const getPosts = (): Promise<ApiResponse<PostDto[]>> => {
  return getData<PostDto[]>(POSTS_ENDPOINT);
};
export const getPostById = (id: number): Promise<ApiResponse<PostDto>> => {
  return getData<PostDto>(`${POSTS_ENDPOINT}/${id}`);
};
export const createPost = (
  payload: CreatePostPayload
): Promise<ApiResponse<number>> => {
  return postData<number>(POSTS_ENDPOINT, payload);
};
export const updatePost = (
  payload: UpdatePostPayload
): Promise<ApiResponse<null>> => {
  return putData<null>(`${POSTS_ENDPOINT}`, payload);
};
export const deletePost = (id: number): Promise<ApiResponse<null>> => {
  return deleteData<null>(`${POSTS_ENDPOINT}/${id}`);
};

export const getCategories = (): Promise<ApiResponse<CategoryDto[]>> => {
  return getData<CategoryDto[]>(CATEGORIES_ENDPOINT);
};

// =========================================================
//                  CATEGORY COMMANDS (KOMUTLAR)
// =========================================================

/**
 * Yeni bir kategori oluşturur.
 * @param payload CreateCategoryPayload
 * @returns ApiResponse<number> (Oluşturulan kategorinin ID'si)
 */
export const createCategory = (
  payload: CreateCategoryPayload
): Promise<ApiResponse<number>> => {
  // C# Handler'ımız int döndürdüğü için TData = number
  return postData<number>(CATEGORIES_ENDPOINT, payload);
};

/**
 * Belirli bir kategoriyi ID ile çeker.
 * @param id Kategori ID'si
 * @returns ApiResponse<CategoryDto>
 */
export const getCategoryById = (
  id: number
): Promise<ApiResponse<CategoryDto>> => {
  return getData<CategoryDto>(`${CATEGORIES_ENDPOINT}/${id}`);
};

/**
 * Var olan bir kategoriyi günceller.
 * @param id Güncellenecek kategorinin ID'si (URL segmenti)
 * @param payload UpdateCategoryPayload
 * @returns ApiResponse<Unit> (Başarılı ise boş veri/null)
 */
export const updateCategory = (
  payload: UpdateCategoryPayload
): Promise<ApiResponse<null>> => {
  // .NET tarafında Command içinde ID olmasına rağmen, RESTful tasarım için
  // URL'deki ID ile gönderi payload'daki ID'yi eşleştiririz.
  return putData<null>(`${CATEGORIES_ENDPOINT}`, payload);
};

/**
 * Bir kategoriyi siler.
 * @param id Silinecek kategorinin ID'si
 * @returns ApiResponse<Unit> (Başarılı ise boş veri/null)
 */
export const deleteCategory = (id: number): Promise<ApiResponse<null>> => {
  return deleteData<null>(`${CATEGORIES_ENDPOINT}/${id}`);
};
