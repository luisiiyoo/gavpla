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

export class GameNotFoundError extends AbstractError {
  constructor(message = 'Game not found.') {
    super(message, 404);
    this.name = 'GameNotFoundError';
  }
}

export class BackendUnavailableError extends AbstractError {
  constructor(message = 'Back-End connection failed.') {
    super(message, 503);
    this.name = 'BackendUnavailableError';
  }
}
