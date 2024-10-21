import { Application } from 'express';
import { IClient } from './client';
import { IProxyOption } from './config';
export declare function createApp(options: IProxyOption, unleashClient?: IClient, app?: Application): Application;
