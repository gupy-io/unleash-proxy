import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly required: readonly ["appName", "instanceId", "bucket"];
    readonly properties: {
        readonly appName: {
            readonly type: "string";
        };
        readonly instanceId: {
            readonly type: "string";
        };
        readonly environment: {
            readonly type: "string";
        };
        readonly bucket: {
            readonly type: "object";
            readonly required: readonly ["start", "stop", "toggles"];
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly stop: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly toggles: {
                    readonly type: "object";
                    readonly example: {
                        readonly myCoolToggle: {
                            readonly yes: 25;
                            readonly no: 42;
                            readonly variants: {
                                readonly blue: 6;
                                readonly green: 15;
                                readonly red: 46;
                            };
                        };
                        readonly myOtherToggle: {
                            readonly yes: 0;
                            readonly no: 100;
                        };
                    };
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly properties: {
                            readonly yes: {
                                readonly type: "integer";
                                readonly minimum: 0;
                            };
                            readonly no: {
                                readonly type: "integer";
                                readonly minimum: 0;
                            };
                            readonly variants: {
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "integer";
                                    readonly minimum: 0;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare type RegisterMetricsSchema = CreateSchemaType<typeof schema>;
export declare const registerMetricsSchema: {
    type: "object";
    required: ["appName", "instanceId", "bucket"];
    properties: {
        appName: {
            type: "string";
        };
        instanceId: {
            type: "string";
        };
        environment: {
            type: "string";
        };
        bucket: {
            type: "object";
            required: ["start", "stop", "toggles"];
            properties: {
                start: {
                    type: "string";
                    format: "date-time";
                };
                stop: {
                    type: "string";
                    format: "date-time";
                };
                toggles: {
                    type: "object";
                    example: {
                        myCoolToggle: {
                            yes: 25;
                            no: 42;
                            variants: {
                                blue: 6;
                                green: 15;
                                red: 46;
                            };
                        };
                        myOtherToggle: {
                            yes: 0;
                            no: 100;
                        };
                    };
                    additionalProperties: {
                        type: "object";
                        properties: {
                            yes: {
                                type: "integer";
                                minimum: 0;
                            };
                            no: {
                                type: "integer";
                                minimum: 0;
                            };
                            variants: {
                                type: "object";
                                additionalProperties: {
                                    type: "integer";
                                    minimum: 0;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
