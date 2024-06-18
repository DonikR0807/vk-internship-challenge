export const REQUEST_STATUSES = {
  idle: "idle",
  pending: "pending",
  success: "success",
  failed: "failed",
} as const;

export type RequestStatusesType = keyof typeof REQUEST_STATUSES;