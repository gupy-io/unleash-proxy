"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequestSchema = void 0;
const strategy_1 = require("unleash-client/lib/strategy/strategy");
const openapi_types_1 = require("../openapi-types");
const schema = {
    type: 'object',
    required: ['features', 'version'],
    additionalProperties: false,
    properties: {
        version: {
            type: 'integer',
            enum: [2],
        },
        features: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name'],
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                    enabled: {
                        type: 'boolean',
                    },
                    stale: {
                        type: 'boolean',
                    },
                    impressionData: {
                        type: 'boolean',
                    },
                    strategies: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['name', 'constraints', 'parameters'],
                            additionalProperties: false,
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                constraints: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['contextName', 'operator'],
                                        additionalProperties: false,
                                        properties: {
                                            contextName: {
                                                type: 'string',
                                            },
                                            operator: {
                                                type: 'string',
                                                description: `One of ${Object.values(strategy_1.Operator)}`,
                                            },
                                            values: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                                parameters: {
                                    type: 'object',
                                },
                            },
                        },
                    },
                    variants: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['name', 'weight', 'overrides'],
                            additionalProperties: false,
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                weight: {
                                    type: 'number',
                                },
                                stickiness: {
                                    type: 'string',
                                },
                                payload: {
                                    type: 'object',
                                    additionalProperties: false,
                                    required: ['type', 'value'],
                                    properties: {
                                        type: { type: 'string' },
                                        value: { type: 'string' },
                                    },
                                },
                                overrides: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['contextName', 'values'],
                                        additionalProperties: false,
                                        properties: {
                                            contextName: {
                                                type: 'string',
                                            },
                                            values: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.apiRequestSchema = (0, openapi_types_1.createSchemaObject)(schema);
//# sourceMappingURL=api-request-schema.js.map