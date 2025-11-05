import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, headers } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;

      this.logger.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          method,
          url: originalUrl,
          status: statusCode,
          durationMs: duration,
          ip,
          userAgent: headers['user-agent'],
        }),
      );
    });
    next();
  }
}
