import { HttpMessage, HttpStatus } from "../constants";
import HttpException from "./httpExceptionHandler";


class BadRequestException extends HttpException {
  statusCode: number;
  constructor(message:string, statusCode:number) {
    super(message , statusCode);
    this.message = message || HttpMessage.BAD_REQUEST;
    this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BadRequestException;