import BadRequestException from "./badRequestException";
import ConflictException from "./conflictHandler";
import ForbiddenException from "./forBiddenException";
import HttpException from "./httpExceptionHandler";
import NotFoundHandler from "./NotFoundHandler";
import UnauthorizedException from "./unAuthorizedException";

export const errorIndex = {
    HttpException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundHandler,
    UnauthorizedException
}