import { LoggerService } from '@nestjs/common';
import { appendFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export class FileLoggerService implements LoggerService {
  private readonly logPath = join(process.cwd(), 'logs', 'app.log');

  constructor() {
    mkdirSync(join(process.cwd(), 'logs'), { recursive: true });
  }

  private write(level: string, message: unknown, context?: string): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context,
      message: String(message),
    });

    process.stdout.write(entry + '\n');
    appendFileSync(this.logPath, entry + '\n');
  }

  log(message: unknown, context?: string) {
    this.write('INFO', message, context);
  }
  error(message: unknown, context?: string) {
    this.write('ERROR', message, context);
  }
  warn(message: unknown, context?: string) {
    this.write('WARN', message, context);
  }
  debug(message: unknown, context?: string) {
    this.write('DEBUG', message, context);
  }
  verbose(message: unknown, context?: string) {
    this.write('VERBOSE', message, context);
  }
}
