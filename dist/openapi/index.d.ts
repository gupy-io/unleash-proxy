import { OpenAPIV3 } from 'openapi-types';
export declare const createOpenApiSchema: (serverUrl?: string | undefined, clientKeysHeaderName?: string) => Omit<OpenAPIV3.Document, 'paths'>;
