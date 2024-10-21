"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createContext(value) {
    const { appName, environment, userId, sessionId, remoteAddress, properties, ...rest } = value;
    // move non root context fields to properties
    const context = {
        appName,
        environment,
        userId,
        sessionId,
        remoteAddress,
        properties: Object.assign({}, rest, properties),
    };
    // Clean undefined properties on the context
    const cleanContext = Object.keys(context)
        .filter((k) => context[k])
        .reduce((a, k) => ({ ...a, [k]: context[k] }), {});
    return cleanContext;
}
exports.createContext = createContext;
//# sourceMappingURL=create-context.js.map