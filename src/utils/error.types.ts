export class AbstractError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthorizedUserError extends AbstractError {
  constructor(message = 'Unable to get data with this user.') {
    super(message, 401);
    this.name = 'UnauthorizedUserError';
  }
}

export class NotFoundError extends AbstractError {
  constructor(message = 'Not found.') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class BackendUnavailableError extends AbstractError {
  constructor(message = 'Unable to stablish connection with the backend.') {
    super(message, 503);
    this.name = 'BackendUnavailableError';
  }
}
