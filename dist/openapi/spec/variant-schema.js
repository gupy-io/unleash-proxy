"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
exports.schema = {
    type: 'object',
    required: ['name', 'enabled'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        enabled: {
            type: 'boolean',
        },
        payload: {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'value'],
            properties: {
                type: { type: 'string', enum: ['string'] },
                value: { type: 'string' },
            },
        },
    },
};
exports.variantSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=variant-schema.js.map