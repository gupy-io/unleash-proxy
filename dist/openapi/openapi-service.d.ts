import { RequestHandler, Application } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { IProxyConfig } from '../config';
export declare class OpenApiService {
    private readonly config;
    private readonly api;
    constructor(config: IProxyConfig);
    docsPath(): string;
    useDocs(app: Application): void;
    validPath(op: OpenAPIV3.OperationObject): RequestHandler;
    useErrorHandler(app: Application): void;
}
