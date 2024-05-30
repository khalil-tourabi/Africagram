import StatusCodes from "http-status-codes";

class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default UnAuthenticatedError;
