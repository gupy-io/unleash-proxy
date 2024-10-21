"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupTogglesSchema = exports.schema = void 0;
const openapi_types_1 = require("../openapi-types");
const unleash_context_schema_1 = require("./unleash-context-schema");
exports.schema = {
    type: 'object',
    properties: {
        context: unleash_context_schema_1.unleashContextSchema,
        toggles: {
            type: 'array',
            example: ['myToggle', 'yourToggle'],
            items: {
                type: 'string',
            },
        },
    },
};
exports.lookupTogglesSchema = (0, openapi_types_1.createSchemaObject)(exports.schema);
//# sourceMappingURL=lookup-toggles-schema.js.map