export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function paginateArray<T>(items: T[], page: number = 1, limit: number = 20): PaginatedResult<T> {
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const offset = (validPage - 1) * limit;
  const paginatedData = items.slice(offset, offset + limit);

  return {
    data: paginatedData,
    meta: {
      page: validPage,
      limit,
      totalCount,
      totalPages,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    },
  };
}
