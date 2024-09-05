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
