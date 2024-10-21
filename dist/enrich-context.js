"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrichContext = void 0;
function enrichContext(contextEnrichers, context) {
    return contextEnrichers.reduce((previous, current) => previous.then(current), Promise.resolve(context));
}
exports.enrichContext = enrichContext;
//# sourceMappingURL=enrich-context.js.map