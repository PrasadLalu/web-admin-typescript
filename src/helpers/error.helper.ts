import logger from '@logger';
import AppError from '../errors/AppError';

class ErrorHelper {
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

export default ErrorHelper;
