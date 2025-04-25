import logger from '@logger';
import AppError from './app.error';

export class ErrorHelper {
    static error(error: unknown): AppError {
        if (error instanceof AppError) {
            logger.error(error);
            return error;
        }

        const message = error instanceof Error ? error.message : 'Unknown error';
        logger.error(error);
        return new AppError(message);
    }
}
