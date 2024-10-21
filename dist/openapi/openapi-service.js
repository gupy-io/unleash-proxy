"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiService = void 0;
const express_openapi_1 = __importDefault(require("@unleash/express-openapi"));
const _1 = require(".");
const common_responses_1 = require("./common-responses");
class OpenApiService {
    constructor(config) {
        this.config = config;
        this.api = (0, express_openapi_1.default)(this.docsPath(), (0, _1.createOpenApiSchema)(config.proxyBasePath, config.clientKeysHeaderName), { coerce: true });
    }
    docsPath() {
        return `${this.config.proxyBasePath}/docs/openapi`;
    }
    // Serve the OpenAPI JSON at `${this.docsPath()}.json`,
    // and the OpenAPI SwaggerUI at `${this.docsPathPath}`.
    useDocs(app) {
        app.use(this.api);
        app.use(this.docsPath(), this.api.swaggerui);
    }
    // Create request validation middleware
    validPath(op) {
        return this.api.validPath(op);
    }
    // Catch and format Open API validation errors.
    useErrorHandler(app) {
        app.use((err, _, res, next) => {
            if (err && err.status && err.validationErrors) {
                res.status(err.statusCode).json({
                    error: err.message,
                    validation: err.validationErrors,
                });
            }
            else if (err instanceof SyntaxError) {
                res.status(400).json({
                    error: `We were unable to parse the data you provided. Please check it for syntax errors. The message we got was: "${err.message}"`,
                });
            }
            else if (err) {
                res.status(500).json({
                    error: (0, common_responses_1.format500ErrorMessage)(err.message),
                });
            }
            else {
                next();
            }
        });
    }
}
exports.OpenApiService = OpenApiService;
//# sourceMappingURL=openapi-service.js.map