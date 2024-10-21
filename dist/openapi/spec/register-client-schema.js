"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClientSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
exports.schema = {
    type: 'object',
    required: ['appName', 'interval', 'started', 'strategies'],
    properties: {
        appName: {
            type: 'string',
            description: 'Name of the application using Unleash',
        },
        instanceId: {
            type: 'string',
            description: 'Instance id for this application (typically hostname, podId or similar)',
        },
        sdkVersion: {
            type: 'string',
            description: 'Optional field that describes the sdk version (name:version)',
        },
        environment: {
            type: 'string',
            deprecated: true,
        },
        interval: {
            type: 'number',
            description: 'At which interval, in milliseconds, will this client be expected to send metrics',
        },
        started: {
            oneOf: [
                { type: 'string', format: 'date-time' },
                { type: 'number' },
            ],
            description: 'When this client started. Should be reported as ISO8601 time.',
        },
        strategies: {
            type: 'array',
            items: {
                type: 'string',
            },
            description: 'List of strategies implemented by this application',
        },
    },
};
exports.registerClientSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=register-client-schema.js.map