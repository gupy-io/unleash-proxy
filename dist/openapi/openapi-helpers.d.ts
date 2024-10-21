import { OpenAPIV3 } from 'openapi-types';
declare type ParameterName = string;
declare type Description = string;
export declare const createRequestParameters: (params: Record<ParameterName, Description>) => OpenAPIV3.ParameterObject[];
export declare const createDeepObjectRequestParameters: (params: Record<ParameterName, {
    description: string;
    example: Record<string, string>;
}>) => OpenAPIV3.ParameterObject[];
export {};
