"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresResponse = void 0;
exports.featuresResponse = {
    description: 'The list of enabled toggles for the provided context.',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/featuresSchema',
            },
        },
    },
};
//# sourceMappingURL=features-response.js.map