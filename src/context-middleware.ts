import { NextFunction, Request, Response } from 'express';
import { createContext } from './create-context';
import { ContextEnricher, enrichContext } from './enrich-context';
import { Logger } from './logger';


const POST = 'POST';
const GET = 'GET';

export const createContexMiddleware: Function =
    (contextEnrichers: ContextEnricher[], logger?: Logger) =>
    async (req: Request, res: Response, next: NextFunction) => {
        let context;
        if (req.method === GET) {
            context = req.query || {};
        } else if (req.method === POST) {
            context = req.body.context || {};
        }
        try {
            if(!context || !context.remoteAddress) {
                if(logger) {
                    logger.warn('No remote address found in request');
                    logger.warn(JSON.stringify(req));
                }
            }
            context.remoteAddress = context.remoteAddress || req.ip;
            res.locals.context = await enrichContext(
                contextEnrichers,
                createContext(context),
            );
            next();
        } catch (err) {
            next(err); // or res.status(500).send("Failed to process the context");
        }
        return;
    };
