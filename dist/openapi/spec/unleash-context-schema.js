"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unleashContextSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
exports.schema = {
    type: 'object',
    properties: {
        appName: { type: 'string' },
        environment: { type: 'string' },
        userId: { type: 'string' },
        sessionId: { type: 'string' },
        remoteAddress: { type: 'string' },
        properties: {
            type: 'object',
            additionalProperties: {
                type: 'string',
            },
            example: {
                region: 'Africa',
                betaTester: 'true',
            },
        },
    },
};
exports.unleashContextSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=unleash-context-schema.js.map