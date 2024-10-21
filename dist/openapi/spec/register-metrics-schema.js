"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMetricsSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
exports.schema = {
    type: 'object',
    required: ['appName', 'instanceId', 'bucket'],
    properties: {
        appName: { type: 'string' },
        instanceId: { type: 'string' },
        environment: { type: 'string' },
        bucket: {
            type: 'object',
            required: ['start', 'stop', 'toggles'],
            properties: {
                start: { type: 'string', format: 'date-time' },
                stop: { type: 'string', format: 'date-time' },
                toggles: {
                    type: 'object',
                    example: {
                        myCoolToggle: {
                            yes: 25,
                            no: 42,
                            variants: {
                                blue: 6,
                                green: 15,
                                red: 46,
                            },
                        },
                        myOtherToggle: {
                            yes: 0,
                            no: 100,
                        },
                    },
                    additionalProperties: {
                        type: 'object',
                        properties: {
                            yes: { type: 'integer', minimum: 0 },
                            no: { type: 'integer', minimum: 0 },
                            variants: {
                                type: 'object',
                                additionalProperties: {
                                    type: 'integer',
                                    minimum: 0,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.registerMetricsSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=register-metrics-schema.js.map