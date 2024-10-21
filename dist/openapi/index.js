"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiSchema = void 0;
const api_request_schema_1 = require("./spec/api-request-schema");
const feature_schema_1 = require("./spec/feature-schema");
const features_schema_1 = require("./spec/features-schema");
const lookup_toggles_schema_1 = require("./spec/lookup-toggles-schema");
const register_metrics_schema_1 = require("./spec/register-metrics-schema");
const register_client_schema_1 = require("./spec/register-client-schema");
const unleash_context_schema_1 = require("./spec/unleash-context-schema");
const variant_schema_1 = require("./spec/variant-schema");
// Create the base OpenAPI schema, with everything except paths.
const createOpenApiSchema = (serverUrl, clientKeysHeaderName = 'Authorization') => ({
    openapi: '3.0.3',
    servers: serverUrl ? [{ url: serverUrl }] : [],
    info: {
        title: 'Unleash Proxy API',
        version: process.env.npm_package_version || '',
    },
    security: [
        {
            apiKey: [],
        },
    ],
    tags: [
        {
            name: 'Proxy client',
            description: 'Feature toggle endpoints intended to be consumed by proxy clients.',
        },
        {
            name: 'Server-side client',
            description: 'Feature toggle endpoints related to and intended to be consumed by server-side clients and other proxies.',
        },
        {
            name: 'Operational',
            description: 'Endpoints related to operating the Unleash proxy.',
        },
    ],
    components: {
        securitySchemes: {
            apiKey: {
                type: 'apiKey',
                in: 'header',
                name: clientKeysHeaderName,
            },
        },
        schemas: {
            apiRequestSchema: api_request_schema_1.apiRequestSchema,
            featureSchema: feature_schema_1.featureSchema,
            featuresSchema: features_schema_1.featuresSchema,
            lookupTogglesSchema: lookup_toggles_schema_1.lookupTogglesSchema,
            registerMetricsSchema: register_metrics_schema_1.registerMetricsSchema,
            registerClientSchema: register_client_schema_1.registerClientSchema,
            unleashContextSchema: unleash_context_schema_1.unleashContextSchema,
            variantSchema: variant_schema_1.variantSchema,
        },
    },
});
exports.createOpenApiSchema = createOpenApiSchema;
//# sourceMappingURL=index.js.map