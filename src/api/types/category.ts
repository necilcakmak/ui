export interface ParentCategoryDto {
  id: number;
  name: string;
}

export interface CategoryReferenceDto {
    id: number;
    name: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  tagName: string | null;
  parentCategoryId: number | null;
  parentCategoryDto: ParentCategoryDto | null;
}

export interface CreateCategoryPayload {
  name: string;
  tagName?: string | null;
  parentCategoryId?: number | null;
}

export interface UpdateCategoryPayload {
  id: number; 
  name: string;
  tagName?: string | null;
  parentCategoryId?: number | null;
}