export type ValidationErrors = {
  [key: string]: string[]; 
};

export interface ApiResponse<TData = any> {
  succeeded: boolean; 
  data: TData; 
  message?: string;
  validationErrors?: ValidationErrors;
}

export type DataResult<T> = ApiResponse<T>;
export type Result = ApiResponse<null>; 