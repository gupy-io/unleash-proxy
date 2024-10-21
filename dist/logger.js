"use strict";
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleLogger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["debug"] = "debug";
    LogLevel["info"] = "info";
    LogLevel["warn"] = "warn";
    LogLevel["error"] = "error";
    LogLevel["fatal"] = "fatal";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const weight = new Map([
    [LogLevel.debug, 0],
    [LogLevel.info, 1],
    [LogLevel.warn, 2],
    [LogLevel.error, 3],
    [LogLevel.fatal, 4],
]);
const resolve = (logLevel) => {
    const w = weight.get(logLevel);
    return w || -1;
};
const stripEmptyArray = (arr) => {
    if (!arr || arr.length === 0) {
        return '';
    }
    return arr;
};
class SimpleLogger {
    constructor(logLevel = LogLevel.warn, useJson = false) {
        this.logLevel = logLevel;
        this.useJson = useJson;
    }
    shouldLog(desired) {
        return resolve(desired) >= resolve(this.logLevel);
    }
    debug(message, ...args) {
        this.log(LogLevel.debug, message, args);
    }
    info(message, ...args) {
        this.log(LogLevel.info, message, args);
    }
    warn(message, ...args) {
        this.log(LogLevel.warn, message, args);
    }
    error(message, ...args) {
        this.log(LogLevel.error, message, args);
    }
    fatal(message, ...args) {
        this.log(LogLevel.fatal, message, args);
    }
    log(level, message, args) {
        if (this.shouldLog(level)) {
            if (this.useJson) {
                console.log(JSON.stringify({ level, message, args }));
            }
            else {
                console.log(`${level.toString().toUpperCase()}: ${message}`, stripEmptyArray(args));
            }
        }
    }
}
exports.SimpleLogger = SimpleLogger;
//# sourceMappingURL=logger.js.map