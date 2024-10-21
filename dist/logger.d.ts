export declare enum LogLevel {
    debug = "debug",
    info = "info",
    warn = "warn",
    error = "error",
    fatal = "fatal"
}
export interface Logger {
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
}
export declare class SimpleLogger implements Logger {
    private logLevel;
    private useJson;
    constructor(logLevel?: LogLevel, useJson?: boolean);
    shouldLog(desired: LogLevel): boolean;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    log(level: LogLevel, message: any, args: any[]): void;
}
