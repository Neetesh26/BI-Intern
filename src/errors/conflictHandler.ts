import { HttpMessage, HttpStatus } from "../constants";
import HttpException from "./httpExceptionHandler";


class ConflictException extends HttpException {
     statusCode: number;
    constructor(message:string , statusCode:number) {
        super(message, statusCode);
        this.name = message || HttpMessage.CONFLICT;
        this.statusCode = statusCode || HttpStatus.CONFLICT;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ConflictException