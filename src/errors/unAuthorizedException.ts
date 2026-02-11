import { HttpMessage, HttpStatus } from "../constants";
import HttpException from "./httpExceptionHandler";


class UnauthorizedException extends HttpException {
  statusCode: number;
  constructor(message:string, statusCode:number) {
    super(message, statusCode);
    this.message = message || HttpMessage.UNAUTHORIZED;
    this.statusCode = statusCode || HttpStatus.UNAUTHORIZED;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UnauthorizedException;   