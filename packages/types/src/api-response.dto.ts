export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    totalCount?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
  timestamp: string;
}
