type ApiErrorProps = {
  message: string;
  status?: number;
};
export class ApiError extends Error {
  status: number;
  constructor({ message, status = 500 }: ApiErrorProps) {
    super();
    this.message = message;
    this.status = status;
  }
}

export const UnAuthenticated = new ApiError({
  message: "You are not authenticated",
  status: 401,
});

export const Forbidden = new ApiError({
  message: "You are not allowed to perform this action",
  status: 403,
});
