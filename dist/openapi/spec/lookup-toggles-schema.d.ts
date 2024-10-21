import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly properties: {
        readonly context: {
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
        readonly toggles: {
            readonly type: "array";
            readonly example: readonly ["myToggle", "yourToggle"];
            readonly items: {
                readonly type: "string";
            };
        };
    };
};
export declare type LookupTogglesSchema = CreateSchemaType<typeof schema>;
export declare const lookupTogglesSchema: {
    type: "object";
    properties: {
        context: {
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
        toggles: {
            type: "array";
            example: ["myToggle", "yourToggle"];
            items: {
                type: "string";
            };
        };
    };
};
