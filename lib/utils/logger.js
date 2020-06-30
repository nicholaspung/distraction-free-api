const { createLogger, format, transports } = require('../');

const deletePostsLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'delete-posts-cron' },
  transports: [
    new transports.File({
      filename: 'delete-posts-cron-error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'delete-posts-cron-combined.log' }),
  ],
});

const redditLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'reddit-cron' },
  transports: [
    new transports.File({ filename: 'reddit-cron-error.log', level: 'error' }),
    new transports.File({ filename: 'reddit-cron-combined.log' }),
  ],
});

module.exports = { deletePostsLogger, redditLogger };
