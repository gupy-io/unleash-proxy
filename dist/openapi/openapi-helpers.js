"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeepObjectRequestParameters = exports.createRequestParameters = void 0;
const createRequestParameters = (params) => Object.entries(params).map(([name, description]) => ({
    name,
    description,
    schema: { type: 'string' },
    in: 'query',
}));
exports.createRequestParameters = createRequestParameters;
const createDeepObjectRequestParameters = (params) => Object.entries(params).map(([name, { description, example }]) => ({
    in: 'query',
    schema: {
        type: 'object',
    },
    style: 'form',
    explode: true,
    name,
    description,
    example,
}));
exports.createDeepObjectRequestParameters = createDeepObjectRequestParameters;
//# sourceMappingURL=openapi-helpers.js.map