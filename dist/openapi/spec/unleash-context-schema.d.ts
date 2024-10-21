import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly properties: {
        readonly appName: {
            readonly type: "string";
        };
        readonly environment: {
            readonly type: "string";
        };
        readonly userId: {
            readonly type: "string";
        };
        readonly sessionId: {
            readonly type: "string";
        };
        readonly remoteAddress: {
            readonly type: "string";
        };
        readonly properties: {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly example: {
                readonly region: "Africa";
                readonly betaTester: "true";
            };
        };
    };
};
export declare type UnleashContextSchema = CreateSchemaType<typeof schema>;
export declare const unleashContextSchema: {
    type: "object";
    properties: {
        appName: {
            type: "string";
        };
        environment: {
            type: "string";
        };
        userId: {
            type: "string";
        };
        sessionId: {
            type: "string";
        };
        remoteAddress: {
            type: "string";
        };
        properties: {
            type: "object";
            additionalProperties: {
                type: "string";
            };
            example: {
                region: "Africa";
                betaTester: "true";
            };
        };
    };
};
