"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequestResponse = void 0;
exports.apiRequestResponse = {
    description: "The proxy's current feature toggle configuration. A list of feature toggles that is parseable by other server-side clients.",
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/apiRequestSchema',
            },
        },
    },
};
//# sourceMappingURL=api-request-response.js.map