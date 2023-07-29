export interface IStatusCode {
  badRequest: number;
  successful: number;
  notFound: number;
  internalServerError: number;
}

export interface Error {
  code: number;
  message: string;
  error?: any;
}
