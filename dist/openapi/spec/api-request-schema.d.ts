import { CreateSchemaType } from '../openapi-types';
declare const schema: {
    readonly type: "object";
    readonly required: readonly ["features", "version"];
    readonly additionalProperties: false;
    readonly properties: {
        readonly version: {
            readonly type: "integer";
            readonly enum: readonly [2];
        };
        readonly features: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly required: readonly ["name"];
                readonly additionalProperties: false;
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly description: {
                        readonly type: "string";
                    };
                    readonly enabled: {
                        readonly type: "boolean";
                    };
                    readonly stale: {
                        readonly type: "boolean";
                    };
                    readonly impressionData: {
                        readonly type: "boolean";
                    };
                    readonly strategies: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["name", "constraints", "parameters"];
                            readonly additionalProperties: false;
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                };
                                readonly constraints: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["contextName", "operator"];
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly contextName: {
                                                readonly type: "string";
                                            };
                                            readonly operator: {
                                                readonly type: "string";
                                                readonly description: `One of ${string}`;
                                            };
                                            readonly values: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly parameters: {
                                    readonly type: "object";
                                };
                            };
                        };
                    };
                    readonly variants: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["name", "weight", "overrides"];
                            readonly additionalProperties: false;
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                };
                                readonly weight: {
                                    readonly type: "number";
                                };
                                readonly stickiness: {
                                    readonly type: "string";
                                };
                                readonly payload: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["type", "value"];
                                    readonly properties: {
                                        readonly type: {
                                            readonly type: "string";
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly overrides: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["contextName", "values"];
                                        readonly additionalProperties: false;
                                        readonly properties: {
                                            readonly contextName: {
                                                readonly type: "string";
                                            };
                                            readonly values: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare type ApiRequestSchema = CreateSchemaType<typeof schema>;
export declare const apiRequestSchema: {
    type: "object";
    required: ["features", "version"];
    additionalProperties: false;
    properties: {
        version: {
            type: "integer";
            enum: [2];
        };
        features: {
            type: "array";
            items: {
                type: "object";
                required: ["name"];
                additionalProperties: false;
                properties: {
                    name: {
                        type: "string";
                    };
                    description: {
                        type: "string";
                    };
                    enabled: {
                        type: "boolean";
                    };
                    stale: {
                        type: "boolean";
                    };
                    impressionData: {
                        type: "boolean";
                    };
                    strategies: {
                        type: "array";
                        items: {
                            type: "object";
                            required: ["name", "constraints", "parameters"];
                            additionalProperties: false;
                            properties: {
                                name: {
                                    type: "string";
                                };
                                constraints: {
                                    type: "array";
                                    items: {
                                        type: "object";
                                        required: ["contextName", "operator"];
                                        additionalProperties: false;
                                        properties: {
                                            contextName: any;
                                            operator: any;
                                            values: any;
                                        };
                                    };
                                };
                                parameters: {
                                    type: "object";
                                };
                            };
                        };
                    };
                    variants: {
                        type: "array";
                        items: {
                            type: "object";
                            required: ["name", "weight", "overrides"];
                            additionalProperties: false;
                            properties: {
                                name: {
                                    type: "string";
                                };
                                weight: {
                                    type: "number";
                                };
                                stickiness: {
                                    type: "string";
                                };
                                payload: {
                                    type: "object";
                                    additionalProperties: false;
                                    required: ["type", "value"];
                                    properties: {
                                        type: {
                                            type: "string";
                                        };
                                        value: {
                                            type: "string";
                                        };
                                    };
                                };
                                overrides: {
                                    type: "array";
                                    items: {
                                        type: "object";
                                        required: ["contextName", "values"];
                                        additionalProperties: false;
                                        properties: {
                                            contextName: any;
                                            values: any;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export {};
