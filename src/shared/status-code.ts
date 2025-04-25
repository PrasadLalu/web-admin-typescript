import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export const created = {
    code: StatusCodes.CREATED,
    status: getReasonPhrase(StatusCodes.CREATED),
};

export const success = {
    code: StatusCodes.OK,
    status: 'Success'
};

export const notFound = {
    code: StatusCodes.NOT_FOUND,
    status: getReasonPhrase(StatusCodes.NOT_FOUND),
};

export const conflict = {
    code: StatusCodes.CONFLICT,
    status: getReasonPhrase(StatusCodes.CONFLICT),
};

export const noContent = {
    code: StatusCodes.NO_CONTENT,
    status: getReasonPhrase(StatusCodes.NO_CONTENT),
};

export const badRequest = {
    code: StatusCodes.BAD_REQUEST,
    status: getReasonPhrase(StatusCodes.BAD_REQUEST),
};

export const unauthorized = {
    code: StatusCodes.UNAUTHORIZED,
    status: getReasonPhrase(StatusCodes.UNAUTHORIZED),
};

export const forbidden = {
    code: StatusCodes.FORBIDDEN,
    status: getReasonPhrase(StatusCodes.FORBIDDEN),
};
