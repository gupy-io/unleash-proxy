"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
const feature_schema_1 = require("./feature-schema");
exports.schema = {
    type: 'object',
    required: ['toggles'],
    additionalProperties: false,
    properties: {
        toggles: {
            type: 'array',
            items: feature_schema_1.featureSchema,
        },
    },
};
exports.featuresSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=features-schema.js.map