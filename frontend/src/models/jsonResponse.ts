export interface SuccessResponse<TData> {
  data: TData;
}

export interface ErrorResponse {
  error: Array<{
    field: string;
    message: string;
  }>;
}

export interface pageInfo {
  page: number;
  limit: number;
  total_row: number;
}

export interface PaginatedResponse<TData> {
  entries: TData[];
  page_info: pageInfo;
}

export type BaseResponse<TData> = SuccessResponse<TData>;
