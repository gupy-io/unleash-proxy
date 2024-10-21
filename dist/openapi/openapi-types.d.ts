import type { FromSchema } from 'json-schema-to-ts';
declare type DeepMutable<T> = {
    -readonly [P in keyof T]: DeepMutable<T[P]>;
};
export declare type CreateSchemaType<T> = FromSchema<T>;
export declare const createSchemaObject: <T>(schema: T) => DeepMutable<T>;
export {};
