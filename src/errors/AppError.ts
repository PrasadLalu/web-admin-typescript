import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { MESSAGES } from '@constant';

class AppError extends Error {
    public code: number;
    public status: string;

    constructor(message?: string, code?: number, defaultStatus?: string) {
        super(message || MESSAGES.SOMETHING_WENT_WRONG);

        this.code = code || StatusCodes.INTERNAL_SERVER_ERROR;
        this.status = defaultStatus || getReasonPhrase(this.code);

        Error.captureStackTrace?.(this, this.constructor);
    }
}

export default AppError;
