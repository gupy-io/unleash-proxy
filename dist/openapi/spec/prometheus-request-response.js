"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prometheusRequestResponse = void 0;
exports.prometheusRequestResponse = {
    description: 'The request was successful. Response in plain text format conforming to Prometheus exposition format',
    content: {
        'text/plain': {
            schema: {
                type: 'string',
                example: 'metric_name 1',
            },
        },
    },
};
//# sourceMappingURL=prometheus-request-response.js.map