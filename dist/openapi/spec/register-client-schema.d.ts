import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly required: readonly ["appName", "interval", "started", "strategies"];
    readonly properties: {
        readonly appName: {
            readonly type: "string";
            readonly description: "Name of the application using Unleash";
        };
        readonly instanceId: {
            readonly type: "string";
            readonly description: "Instance id for this application (typically hostname, podId or similar)";
        };
        readonly sdkVersion: {
            readonly type: "string";
            readonly description: "Optional field that describes the sdk version (name:version)";
        };
        readonly environment: {
            readonly type: "string";
            readonly deprecated: true;
        };
        readonly interval: {
            readonly type: "number";
            readonly description: "At which interval, in milliseconds, will this client be expected to send metrics";
        };
        readonly started: {
            readonly oneOf: readonly [{
                readonly type: "string";
                readonly format: "date-time";
            }, {
                readonly type: "number";
            }];
            readonly description: "When this client started. Should be reported as ISO8601 time.";
        };
        readonly strategies: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
            readonly description: "List of strategies implemented by this application";
        };
    };
};
export declare type RegisterClientSchema = CreateSchemaType<typeof schema>;
export declare const registerClientSchema: {
    type: "object";
    required: ["appName", "interval", "started", "strategies"];
    properties: {
        appName: {
            type: "string";
            description: "Name of the application using Unleash";
        };
        instanceId: {
            type: "string";
            description: "Instance id for this application (typically hostname, podId or similar)";
        };
        sdkVersion: {
            type: "string";
            description: "Optional field that describes the sdk version (name:version)";
        };
        environment: {
            type: "string";
            deprecated: true;
        };
        interval: {
            type: "number";
            description: "At which interval, in milliseconds, will this client be expected to send metrics";
        };
        started: {
            oneOf: [{
                type: "string";
                format: "date-time";
            }, {
                type: "number";
            }];
            description: "When this client started. Should be reported as ISO8601 time.";
        };
        strategies: {
            type: "array";
            items: {
                type: "string";
            };
            description: "List of strategies implemented by this application";
        };
    };
};
