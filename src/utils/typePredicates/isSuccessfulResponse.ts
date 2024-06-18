export interface SuccessfullResponse<T = unknown> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export function isSuccessfullResponse(
  data: unknown
): data is SuccessfullResponse {
  const response = data as SuccessfullResponse;

  if (!response) {
    return false;
  }

  if (typeof response.total !== "number") {
    return false;
  }

  if (typeof response.limit !== "number") {
    return false;
  }

  if (typeof response.page !== "number") {
    return false;
  }

  if (typeof response.pages !== "number") {
    return false;
  }

  if (!response.docs || !Array.isArray(response.docs)) {
    return false;
  }

  return true;
}
