import { HttpMessage, HttpStatus } from "../constants";
import HttpException from "./httpExceptionHandler";


class ForbiddenException extends HttpException {
  statusCode: number;
  constructor(message:string, statusCode:number) {
    super(message, statusCode);
    this.message = message || HttpMessage.FORBIDDEN;
    this.statusCode = statusCode || HttpStatus.FORBIDDEN;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ForbiddenException;
