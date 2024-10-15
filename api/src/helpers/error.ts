import express from 'express';

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const accessDeniedMsg = 'Access denied';
export const forbiddenMsg = 'Forbidden: You do not have access to this resource';
export const internalErrorMsg = 'Internal Server Error';

export const statusBadRequest = 400;
export const statusAccessDenied = 401;
export const statusForbidden = 403;
export const statusInternal = 500;

export const AccessDeniedException = new ErrorHandler(statusAccessDenied, accessDeniedMsg);
export const ForbiddenException = new ErrorHandler(statusForbidden, forbiddenMsg);
export const InternalFailureException = new ErrorHandler(statusInternal, internalErrorMsg);
export const BadRequestException = (msg: string) => new ErrorHandler(statusBadRequest, msg);

export const handleError = (err: ErrorHandler, res: express.Response): void => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
