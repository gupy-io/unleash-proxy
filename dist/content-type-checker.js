"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_is_1 = require("type-is");
const DEFAULT_ACCEPTED_CONTENT_TYPE = 'application/json';
/**
 * Builds an express middleware that checks the content-type header of requests with bodies.
 *
 * If the request has no body (as determined by the `type-is` library's
 * `hasBody` function), this middleware passes it along to the next in line.
 *
 * If the request has a body, it checks whether the content-type matches one of
 * the accepted content types, returning a 415 if it doesn't.
 *
 * If the request has a body, but not no content-type header, it will modify the
 * request and add the first accepted content type as the content-type header,
 * passing it along to the next request handler.
 *
 * @param {String} acceptedContentTypes - The list of content-types the middleware
 * should accept. Defaults to ['application/json'] if none are provided.
 *
 * @returns {function(Request, Response, NextFunction): void}
 */
function requireContentType(...acceptedContentTypes) {
    if (acceptedContentTypes.length === 0) {
        acceptedContentTypes.push(DEFAULT_ACCEPTED_CONTENT_TYPE);
    }
    return (req, res, next) => {
        const contentType = req.header('Content-Type');
        if ((0, type_is_1.hasBody)(req)) {
            if (!contentType) {
                req.headers['content-type'] = acceptedContentTypes[0];
                next();
            }
            else if ((0, type_is_1.is)(contentType, acceptedContentTypes)) {
                next();
            }
            else {
                res.status(415).end();
            }
        }
        else {
            next();
        }
    };
}
exports.default = requireContentType;
//# sourceMappingURL=content-type-checker.js.map