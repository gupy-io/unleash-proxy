import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly required: readonly ["toggles"];
    readonly additionalProperties: false;
    readonly properties: {
        readonly toggles: {
            readonly type: "array";
            readonly items: {
                type: "object";
                required: ["name", "enabled", "impressionData"];
                additionalProperties: false;
                properties: {
                    name: {
                        type: "string";
                    };
                    enabled: {
                        type: "boolean";
                    };
                    impressionData: {
                        type: "boolean";
                    };
                    variant: {
                        type: "object";
                        required: ["name", "enabled"];
                        additionalProperties: false;
                        properties: {
                            name: {
                                type: "string";
                            };
                            enabled: {
                                type: "boolean";
                            };
                            payload: {
                                type: "object";
                                additionalProperties: false;
                                required: ["type", "value"];
                                properties: {
                                    type: {
                                        type: "string";
                                        enum: ["string"];
                                    };
                                    value: {
                                        type: "string";
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
export declare type FeaturesSchema = CreateSchemaType<typeof schema>;
export declare const featuresSchema: {
    type: "object";
    required: ["toggles"];
    additionalProperties: false;
    properties: {
        toggles: {
            type: "array";
            items: {
                type: "object";
                required: ["name", "enabled", "impressionData"];
                additionalProperties: false;
                properties: {
                    name: {
                        type: "string";
                    };
                    enabled: {
                        type: "boolean";
                    };
                    impressionData: {
                        type: "boolean";
                    };
                    variant: {
                        type: "object";
                        required: ["name", "enabled"];
                        additionalProperties: false;
                        properties: {
                            name: {
                                type: "string";
                            };
                            enabled: {
                                type: "boolean";
                            };
                            payload: {
                                type: "object";
                                additionalProperties: false;
                                required: ["type", "value"];
                                properties: {
                                    type: {
                                        type: "string";
                                        enum: ["string"];
                                    };
                                    value: {
                                        type: "string";
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
