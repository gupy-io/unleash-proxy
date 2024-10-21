"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = __importDefault(require("./client"));
const config_1 = require("./config");
const unleash_proxy_1 = __importDefault(require("./unleash-proxy"));
const openapi_service_1 = require("./openapi/openapi-service");
const content_type_checker_1 = __importDefault(require("./content-type-checker"));
function createApp(options, unleashClient, app = (0, express_1.default)()) {
    const config = (0, config_1.createProxyConfig)(options);
    const { logger } = config;
    logger.debug('Configuration:', config);
    const client = unleashClient || new client_1.default(config);
    const openApiService = new openapi_service_1.OpenApiService(config);
    if (config.enableOAS) {
        openApiService.useDocs(app);
    }
    const proxy = new unleash_proxy_1.default(client, config, openApiService);
    app.disable('x-powered-by');
    try {
        app.set('trust proxy', config.trustProxy);
    }
    catch (err) {
        logger.error(`The provided "trustProxy" option was not valid ("${config.trustProxy}")`, err);
    }
    if (typeof options.preHook === 'function') {
        options.preHook(app);
    }
    const corsOptions = config.cors;
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, compression_1.default)());
    app.use(`${config.proxyBasePath}/proxy`, (0, content_type_checker_1.default)(), (0, cors_1.default)(corsOptions), express_1.default.json(), proxy.middleware);
    openApiService.useErrorHandler(app);
    return app;
}
exports.createApp = createApp;
module.exports = { createApp };
//# sourceMappingURL=app.js.map