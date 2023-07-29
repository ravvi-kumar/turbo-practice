export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: any;
}

export interface LanguageMessages {
  [key: string]: string;
}
