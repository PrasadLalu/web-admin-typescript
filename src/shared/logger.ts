import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log levels with explicit types
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
} as const;

// Type the levels object for better type safety
// type Level = typeof levels[keyof typeof levels];
type LogLevel = keyof typeof levels;

// Configure DailyRotateFile transport
const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

// Create logger instance with typed configuration
const logger = winston.createLogger({
    level: 'info' as LogLevel,
    levels,
    transports: [transport],
    exitOnError: false,
});

// Add Console transport in non-production environment
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

// Export the logger as a typed module
export default logger;
