"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
const variant_schema_1 = require("./variant-schema");
exports.schema = {
    type: 'object',
    required: ['name', 'enabled', 'impressionData'],
    additionalProperties: false,
    properties: {
        name: {
            type: 'string',
        },
        enabled: {
            type: 'boolean',
        },
        impressionData: {
            type: 'boolean',
        },
        variant: variant_schema_1.variantSchema,
    },
};
exports.featureSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=feature-schema.js.map