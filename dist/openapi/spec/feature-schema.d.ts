import { CreateSchemaType } from '../openapi-types';
export declare const schema: {
    readonly type: "object";
    readonly required: readonly ["name", "enabled", "impressionData"];
    readonly additionalProperties: false;
    readonly properties: {
        readonly name: {
            readonly type: "string";
        };
        readonly enabled: {
            readonly type: "boolean";
        };
        readonly impressionData: {
            readonly type: "boolean";
        };
        readonly variant: {
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
export declare type FeatureSchema = CreateSchemaType<typeof schema>;
export declare const featureSchema: {
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
