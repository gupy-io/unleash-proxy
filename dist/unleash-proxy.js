"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const features_response_1 = require("./openapi/spec/features-response");
const common_responses_1 = require("./openapi/common-responses");
const api_request_response_1 = require("./openapi/spec/api-request-response");
const prometheus_request_response_1 = require("./openapi/spec/prometheus-request-response");
const lookup_toggles_request_1 = require("./openapi/spec/lookup-toggles-request");
const register_metrics_request_1 = require("./openapi/spec/register-metrics-request");
const register_client_request_1 = require("./openapi/spec/register-client-request");
const openapi_helpers_1 = require("./openapi/openapi-helpers");
const context_middleware_1 = require("./context-middleware");
class UnleashProxy {
    constructor(client, config, openApiService) {
        this.ready = false;
        this.enableAllEndpoint = false;
        this.logger = config.logger;
        this.clientKeys = config.clientKeys;
        this.serverSideTokens = config.serverSideSdkConfig
            ? config.serverSideSdkConfig.tokens
            : [];
        this.clientKeysHeaderName = config.clientKeysHeaderName;
        this.client = client;
        this.enableAllEndpoint = config.enableAllEndpoint || false;
        this.contextEnrichers = config.expCustomEnrichers
            ? config.expCustomEnrichers
            : [];
        const contextMiddleware = (0, context_middleware_1.createContexMiddleware)(this.contextEnrichers, this.logger);
        if (client.isReady()) {
            this.setReady();
        }
        this.client.on('ready', () => {
            this.setReady();
        });
        const router = (0, express_1.Router)();
        this.middleware = router;
        // Routes
        router.get('', openApiService.validPath({
            parameters: [
                ...(0, openapi_helpers_1.createRequestParameters)({
                    appName: "Your application's name",
                    userId: "The current user's ID",
                    sessionId: "The current session's ID",
                    remoteAddress: "Your application's IP address",
                }),
                ...(0, openapi_helpers_1.createDeepObjectRequestParameters)({
                    properties: {
                        description: 'Additional (custom) context fields',
                        example: {
                            region: 'Africa',
                            betaTester: 'true',
                        },
                    },
                }),
            ],
            responses: {
                ...(0, common_responses_1.standardResponses)(401, 500, 503),
                200: features_response_1.featuresResponse,
            },
            description: 'This endpoint returns the list of feature toggles that the proxy evaluates to enabled for the given context. Context values are provided as query parameters.',
            summary: 'Retrieve enabled feature toggles for the provided context.',
            tags: ['Proxy client'],
        }), this.readyMiddleware.bind(this), this.clientTokenMiddleware.bind(this), contextMiddleware, this.getEnabledToggles.bind(this));
        router.get('/all', openApiService.validPath({
            parameters: [
                ...(0, openapi_helpers_1.createRequestParameters)({
                    appName: "Your application's name",
                    userId: "The current user's ID",
                    sessionId: "The current session's ID",
                    remoteAddress: "Your application's IP address",
                }),
                ...(0, openapi_helpers_1.createDeepObjectRequestParameters)({
                    properties: {
                        description: 'Additional (custom) context fields',
                        example: {
                            region: 'Africa',
                            betaTester: 'true',
                        },
                    },
                }),
            ],
            responses: {
                ...(0, common_responses_1.standardResponses)(401, 500, 501, 503),
                200: features_response_1.featuresResponse,
            },
            description: `This endpoint returns all feature toggles known to the proxy, along with whether they are enabled or disabled for the provided context. This endpoint always returns **all** feature toggles the proxy retrieves from Unleash, in contrast to the \`/proxy\` endpoints that only return enabled toggles.

Useful if you are migrating to unleash and need to know if the feature flag exists on the Unleash server.

However, using this endpoint will increase the payload size transmitted to your applications. Context values are provided as query parameters.`,
            summary: 'Retrieve all feature toggles from the proxy.',
            tags: ['Proxy client'],
        }), this.readyMiddleware.bind(this), this.clientTokenMiddleware.bind(this), contextMiddleware, this.getAllToggles.bind(this));
        router.post('/all', openApiService.validPath({
            requestBody: lookup_toggles_request_1.lookupTogglesRequest,
            responses: {
                ...(0, common_responses_1.standardResponses)(401, 415, 500, 501, 503),
                200: features_response_1.featuresResponse,
            },
            description: `This endpoint accepts a JSON object with a \`context\` property and an optional \`toggles\` property.

If you provide the \`toggles\` property, the proxy will use the provided context value to evaluate each of the toggles you sent in. The proxy returns a list with all the toggles you provided in their fully evaluated states.

If you don't provide the \`toggles\` property, then this operation functions exactly the same as the GET operation on this endpoint, except that it uses the \`context\` property instead of query parameters: The proxy will evaluate all its toggles against the context you provide and return a list of all known feature toggles and their evaluated state.`,
            summary: 'Evaluate some or all toggles against the provided context.',
            tags: ['Proxy client'],
        }), this.readyMiddleware.bind(this), this.clientTokenMiddleware.bind(this), contextMiddleware, this.getAllTogglesPOST.bind(this));
        router.post('', openApiService.validPath({
            requestBody: lookup_toggles_request_1.lookupTogglesRequest,
            responses: {
                ...(0, common_responses_1.standardResponses)(400, 401, 415, 500, 503),
                200: features_response_1.featuresResponse,
            },
            description: `This endpoint accepts a JSON object with a \`context\` property and an optional \`toggles\` property.

If you provide the \`toggles\` property, the proxy will use the provided context value to evaluate each of the toggles you sent in. The proxy returns a list with all the toggles you provided in their fully evaluated states.

If you don't provide the \`toggles\` property, then this operation functions exactly the same as the GET operation on this endpoint, except that it uses the \`context\` property instead of query parameters: The proxy will evaluate all its toggles against the context you provide and return a list of enabled toggles.`,
            summary: 'Evaluate specific toggles against the provided context.',
            tags: ['Proxy client'],
        }), this.readyMiddleware.bind(this), this.clientTokenMiddleware.bind(this), contextMiddleware, this.lookupToggles.bind(this));
        router.get('/client/features', openApiService.validPath({
            responses: {
                ...(0, common_responses_1.standardResponses)(401, 503),
                200: api_request_response_1.apiRequestResponse,
            },
            description: "Returns the toggle configuration from the proxy's internal Unleash SDK. Use this to bootstrap other proxies and server-side SDKs. Requires you to provide one of the proxy's configured `serverSideTokens` for authorization.",
            summary: "Retrieve the proxy's current toggle configuration (as consumed by the internal client).",
            tags: ['Server-side client'],
        }), this.readyMiddleware.bind(this), this.clientTokenMiddleware.bind(this), this.unleashApi.bind(this));
        router.post('/client/metrics', openApiService.validPath({
            requestBody: register_metrics_request_1.registerMetricsRequest,
            responses: (0, common_responses_1.standardResponses)(200, 400, 401),
            description: "This endpoint lets you register usage metrics with Unleash. Accepts either one of the proxy's configured `serverSideTokens` or one of its `clientKeys` for authorization.",
            summary: 'Send usage metrics to Unleash.',
            tags: ['Operational', 'Server-side client'],
        }), this.registerMetrics.bind(this));
        router.post('/client/register', openApiService.validPath({
            requestBody: register_client_request_1.registerClientRequest,
            responses: (0, common_responses_1.standardResponses)(200, 400, 401),
            description: "This endpoint lets you register application with Unleash. Accepts either one of the proxy's configured `serverSideTokens` or one of its `clientKeys` for authorization.",
            summary: 'Register clients with Unleash.',
            tags: ['Operational', 'Server-side client'],
        }), this.registerClient.bind(this));
        router.get('/health', openApiService.validPath({
            security: [],
            responses: {
                ...(0, common_responses_1.standardResponses)(200, 503),
            },
            description: 'Returns a 200 OK if the proxy is ready to receive requests. Otherwise returns a 503 NOT READY.',
            summary: 'Check whether the proxy is ready to serve requests yet.',
            tags: ['Operational'],
        }), this.readyMiddleware.bind(this), this.health.bind(this));
        router.get('/internal-backstage/prometheus', openApiService.validPath({
            security: [],
            responses: {
                ...(0, common_responses_1.standardResponses)(503),
                200: prometheus_request_response_1.prometheusRequestResponse,
            },
            description: 'Returns a 200 and valid Prometheus text syntax if the proxy is ready to receive requests. Otherwise returns a 503 NOT READY.',
            summary: 'Check whether the proxy is up and running',
            tags: ['Operational'],
        }), this.readyMiddleware.bind(this), this.prometheus.bind(this));
    }
    setReady() {
        this.ready = true;
        this.logger.info('Successfully synchronized with Unleash API. Proxy is now ready to receive traffic.');
    }
    // kept for backward compatibility
    setProxySecrets(clientKeys) {
        this.setClientKeys(clientKeys);
    }
    setClientKeys(clientKeys) {
        this.clientKeys = clientKeys;
    }
    readyMiddleware(req, res, next) {
        if (!this.ready) {
            this.logger.debug('Not ready to serve requests yet.');
            res.status(503).send(common_responses_1.NOT_READY_MSG);
        }
        else {
            next();
        }
    }
    clientTokenMiddleware(req, res, next) {
        const apiToken = req.header(this.clientKeysHeaderName);
        if (!apiToken || !this.clientKeys.includes(apiToken)) {
            res.sendStatus(401);
        }
        else {
            next();
        }
    }
    async getAllToggles(req, res) {
        if (!this.enableAllEndpoint) {
            res.status(501).send('The /proxy/all endpoint is disabled. Please check your server configuration. To enable it, set the `enableAllEndpoint` configuration option or `ENABLE_ALL_ENDPOINT` environment variable to `true`.');
            return;
        }
        const { context } = res.locals;
        const toggles = this.client.getAllToggles(context);
        res.set('Cache-control', 'public, max-age=2');
        res.send({ toggles });
    }
    async getAllTogglesPOST(req, res) {
        if (!this.enableAllEndpoint) {
            res.status(501).send('The /proxy/all endpoint is disabled. Please check your server configuration. To enable it, set the `enableAllEndpoint` configuration option or `ENABLE_ALL_ENDPOINT` environment variable to `true`.');
            return;
        }
        res.set('Cache-control', 'public, max-age=2');
        const { toggles: toggleNames = [] } = req.body;
        const { context } = res.locals;
        if (toggleNames.length > 0) {
            const toggles = this.client.getDefinedToggles(toggleNames, context);
            res.send({ toggles });
        }
        else {
            const toggles = this.client.getAllToggles(context);
            res.send({ toggles });
        }
    }
    async getEnabledToggles(req, res) {
        const { context } = res.locals;
        const toggles = this.client.getEnabledToggles(context);
        res.set('Cache-control', 'public, max-age=2');
        res.send({ toggles });
    }
    async lookupToggles(req, res) {
        res.set('Cache-control', 'public, max-age=2');
        const { toggles: toggleNames = [] } = req.body;
        const { context } = res.locals;
        if (toggleNames.length > 0) {
            const toggles = this.client.getDefinedToggles(toggleNames, context);
            res.send({ toggles });
        }
        else {
            const toggles = this.client.getEnabledToggles(context);
            res.send({ toggles });
        }
    }
    health(_, res) {
        res.send('ok');
    }
    prometheus(_, res) {
        const prometheusResponse = '# HELP unleash_proxy_up Indication that the service is up. \n' +
            '# TYPE unleash_proxy_up counter\n' +
            'unleash_proxy_up 1\n';
        res.set('Content-type', 'text/plain');
        res.send(prometheusResponse);
    }
    registerMetrics(req, res) {
        const token = req.header(this.clientKeysHeaderName);
        const validTokens = [...this.clientKeys, ...this.serverSideTokens];
        if (token && validTokens.includes(token)) {
            this.client.registerMetrics(req.body);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(401);
        }
    }
    registerClient(req, res) {
        const token = req.header(this.clientKeysHeaderName);
        const validTokens = [...this.clientKeys, ...this.serverSideTokens];
        if (token && validTokens.includes(token)) {
            this.logger.debug('Client registration is not supported yet.');
            res.sendStatus(200);
        }
        else {
            res.sendStatus(401);
        }
    }
    unleashApi(req, res) {
        const features = this.client.getFeatureToggleDefinitions();
        res.set('Cache-control', 'public, max-age=2');
        res.send({ version: 2, features });
    }
}
exports.default = UnleashProxy;
//# sourceMappingURL=unleash-proxy.js.map