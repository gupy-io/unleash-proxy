import { Context } from 'unleash-client';
export declare type ContextEnricher = (context: Context) => Promise<Context>;
export declare function enrichContext(contextEnrichers: ContextEnricher[], context: Context): Promise<Context>;
