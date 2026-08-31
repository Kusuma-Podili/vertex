export class EnterpriseLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: string, ...optionalParams: any[]) {
    console.log(`[LOG] [${new Date().toISOString()}] [${this.context}] ${message}`, ...optionalParams);
  }

  error(message: string, trace?: string, ...optionalParams: any[]) {
    console.error(`[ERROR] [${new Date().toISOString()}] [${this.context}] ${message}`, trace, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    console.warn(`[WARN] [${new Date().toISOString()}] [${this.context}] ${message}`, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    console.debug(`[DEBUG] [${new Date().toISOString()}] [${this.context}] ${message}`, ...optionalParams);
  }
}
