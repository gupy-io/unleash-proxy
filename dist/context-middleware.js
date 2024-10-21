"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContexMiddleware = void 0;
const create_context_1 = require("./create-context");
const enrich_context_1 = require("./enrich-context");
const POST = 'POST';
const GET = 'GET';
const createContexMiddleware = (contextEnrichers) => async (req, res, next) => {
    let context;
    if (req.method === GET) {
        context = req.query || {};
    }
    else if (req.method === POST) {
        context = req.body.context || {};
    }
    try {
        context.remoteAddress = context.remoteAddress || req.ip;
        res.locals.context = await (0, enrich_context_1.enrichContext)(contextEnrichers, (0, create_context_1.createContext)(context));
        next();
    }
    catch (err) {
        next(err); // or res.status(500).send("Failed to process the context");
    }
    return;
};
exports.createContexMiddleware = createContexMiddleware;
//# sourceMappingURL=context-middleware.js.map