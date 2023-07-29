import {Response} from 'express';
import {IApiResponse} from '../interface';
import {statusCode} from '../request-status-code';

/**
 * Utility function to send API response.
 * @param res The Express Response object.
 * @param statusCode The HTTP status code to be set in the response.
 * @param success A boolean indicating the success status of the API.
 * @param message A string representing the message associated with the response.
 * @param payload (optional) The data payload to be included in the response.
 * @param meta (optional) Any additional metadata to be included in the response.
 * @returns A Promise that resolves with the provided statusCode.
 */
export const makeResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  payload?: T,
  meta?: any
): Promise<number> => {
  return new Promise<number>(resolve => {
    const response: IApiResponse<T> = {
      success,
      message,
      data: payload,
      meta,
    };

    res.status(statusCode).send(response);
    resolve(statusCode);
  });
};

/**
 * Handles error by sending a response with the provided message.
 * @param res The response object.
 * @param message The error message to send in the response.
 * @returns The response with the error message.
 */
export const handleError = (res: Response, message: string) => {
  return makeResponse(res, statusCode.badRequest, false, message);
};
