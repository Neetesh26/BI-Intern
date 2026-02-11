import { HttpMessage, HttpStatus } from "../constants";
import HttpException from "./httpExceptionHandler";

class NotFoundHandler extends HttpException {
        statusCode: number;
    constructor(message:string , statusCode:number) {
        super(message, statusCode);
        this.name = message || HttpMessage.NOT_FOUND;
        this.statusCode = statusCode || HttpStatus.NOT_FOUND;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default NotFoundHandler;