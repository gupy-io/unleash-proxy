"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardResponses = exports.notImplementedError = exports.internalServerErrorResponse = exports.unsupportedMediaTypeResponse = exports.emptySuccessResponse = exports.badRequestResponse = exports.unauthorizedResponse = exports.notReadyResponse = exports.NOT_READY_MSG = exports.format500ErrorMessage = void 0;
const format500ErrorMessage = (errorMessage) => `Whoops! We dropped the ball on this one (an unexpected error occurred): ${errorMessage}`;
exports.format500ErrorMessage = format500ErrorMessage;
exports.NOT_READY_MSG = 'The Unleash Proxy has not connected to the Unleash API and is not ready to accept requests yet.';
exports.notReadyResponse = {
    description: "The proxy isn't ready to accept requests yet.",
    content: {
        'text/plain': {
            schema: {
                type: 'string',
                example: exports.NOT_READY_MSG,
            },
        },
    },
};
exports.unauthorizedResponse = {
    description: 'Authorization information is missing or invalid.',
};
exports.badRequestResponse = {
    description: 'The provided request data is invalid.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['error'],
                properties: {
                    error: { type: 'string' },
                    validation: {
                        type: 'array',
                        items: { type: 'object' },
                    },
                },
                example: {
                    error: 'Request validation failed',
                    validation: [
                        {
                            keyword: 'required',
                            dataPath: '.body',
                            schemaPath: '#/components/schemas/registerMetricsSchema/required',
                            params: {
                                missingProperty: 'appName',
                            },
                            message: "should have required property 'appName'",
                        },
                    ],
                },
            },
        },
    },
};
exports.emptySuccessResponse = {
    description: 'The request was successful.',
    content: {
        'text/plain': {
            schema: {
                type: 'string',
                example: 'ok',
            },
        },
    },
};
exports.unsupportedMediaTypeResponse = {
    description: 'The operation does not support request payloads of the provided type.',
    content: {
        'text/plain': {
            schema: {
                type: 'string',
                example: 'Unsupported media type',
            },
        },
    },
};
exports.internalServerErrorResponse = {
    description: "Something went wrong on the server side and we were unable to recover. If you have custom strategies loaded, make sure they don't throw errors.",
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['error'],
                properties: {
                    error: { type: 'string' },
                },
                example: {
                    error: (0, exports.format500ErrorMessage)("Cannot read properties of undefined (reading 'includes')"),
                },
            },
        },
    },
};
exports.notImplementedError = {
    description: 'The functionality you are requesting is not implemented by the server. This could be due to a misconfiguration when starting the server.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                required: ['error'],
                properties: {
                    error: {
                        type: 'string',
                        description: 'A description of the error that occurred.',
                    },
                },
                example: {
                    error: 'This functionality is not implemented by the server',
                },
            },
        },
    },
};
const commonResponses = {
    200: exports.emptySuccessResponse,
    400: exports.badRequestResponse,
    401: exports.unauthorizedResponse,
    415: exports.unsupportedMediaTypeResponse,
    500: exports.internalServerErrorResponse,
    501: exports.notImplementedError,
    503: exports.notReadyResponse,
};
const standardResponses = (...statusCodes) => statusCodes.reduce((acc, n) => ({
    ...acc,
    [n]: commonResponses[n],
}), {});
exports.standardResponses = standardResponses;
//# sourceMappingURL=common-responses.js.map