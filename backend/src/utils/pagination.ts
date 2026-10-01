import type { PaginationMeta } from '@serisara/shared';

// ============================================================
// Pagination Helper
// ============================================================

export interface PaginationInput {
  page?: number | string;
  perPage?: number | string;
}

export interface ParsedPagination {
  page: number;
  perPage: number;
  offset: number;
}

const MAX_PER_PAGE = 100;
const DEFAULT_PER_PAGE = 20;

export function parsePagination(input: PaginationInput): ParsedPagination {
  const page = Math.max(1, Number(input.page) || 1);
  const perPage = Math.min(MAX_PER_PAGE, Math.max(1, Number(input.perPage) || DEFAULT_PER_PAGE));
  const offset = (page - 1) * perPage;

  return { page, perPage, offset };
}

export function buildPaginationMeta(
  page: number,
  perPage: number,
  total: number
): PaginationMeta {
  return {
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}
