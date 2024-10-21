"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_type_checker_1 = __importDefault(require("../content-type-checker"));
const mockRequest = (transferEncoding) => (contentType) => {
    const headers = {
        'content-type': contentType,
        'transfer-encoding': transferEncoding,
    };
    // @ts-expect-error (It's not a real request)
    return {
        header: (name) => 
        //@ts-expect-error (yes, this may fail)
        headers[name.toLowerCase()],
        headers,
    };
};
const mockRequestWithBody = mockRequest('chunked');
const mockRequestWithoutBody = mockRequest(undefined);
const returns415 = (t) => ({
    // @ts-ignore
    status: (code) => {
        expect(415).toBe(code);
        return {
            end: t,
        };
    },
});
const expectNoCall = (t) => ({
    // @ts-ignore
    status: () => ({
        // @ts-ignore
        end: () => expect(t).toHaveBeenCalledTimes(0),
    }),
});
describe('Content-type checker middleware', () => {
    test('should by default only support application/json', () => {
        const middleware = (0, content_type_checker_1.default)();
        const t = jest.fn();
        const fail = jest.fn();
        middleware(mockRequestWithBody('application/json'), expectNoCall(fail), t);
        middleware(mockRequestWithBody('text/plain'), returns415(t), fail);
        expect(t).toHaveBeenCalledTimes(2);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    test('should support application/json with charset by default', () => {
        const middleware = (0, content_type_checker_1.default)();
        const t = jest.fn();
        const fail = jest.fn();
        middleware(mockRequestWithBody('application/json; charset=UTF-8'), expectNoCall(fail), t);
        middleware(mockRequestWithBody('text/plain'), returns415(t), fail);
        expect(t).toHaveBeenCalledTimes(2);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    test('should allow adding custom supported types', () => {
        const middleware = (0, content_type_checker_1.default)('application/yaml');
        const t = jest.fn();
        const fail = jest.fn();
        middleware(mockRequestWithBody('application/yaml'), expectNoCall(fail), t);
        middleware(mockRequestWithBody('text/html'), returns415(t), fail);
        middleware(mockRequestWithBody('text/plain'), returns415(t), fail);
        expect(t).toHaveBeenCalledTimes(3);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    test('does not support default support types if you provide your own', () => {
        const middleware = (0, content_type_checker_1.default)('application/yaml');
        const t = jest.fn();
        const fail = jest.fn();
        middleware(mockRequestWithBody('application/json'), returns415(t), fail);
        expect(t).toHaveBeenCalledTimes(1);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    test('Should accept multiple content-types', () => {
        const middleware = (0, content_type_checker_1.default)('application/json', 'application/yaml', 'form/multipart');
        const fail = jest.fn();
        const succeed = jest.fn();
        middleware(mockRequestWithBody('application/json'), expectNoCall(fail), succeed);
        middleware(mockRequestWithBody('application/yaml'), expectNoCall(fail), succeed);
        middleware(mockRequestWithBody('form/multipart'), expectNoCall(fail), succeed);
        middleware(mockRequestWithBody('text/plain'), returns415(succeed), fail);
        expect(succeed).toHaveBeenCalledTimes(4);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    test('should not stop requests that have no body', () => {
        const middleware = (0, content_type_checker_1.default)('application/yaml');
        const t = jest.fn();
        const fail = jest.fn();
        middleware(mockRequestWithBody('application/json'), returns415(t), fail);
        expect(t).toHaveBeenCalledTimes(1);
        expect(fail).toHaveBeenCalledTimes(0);
    });
    describe('add default content-types to requests with bodies but no content-type', () => {
        test('should add the default content type if no custom types are provided', () => {
            const middleware = (0, content_type_checker_1.default)();
            const request = mockRequestWithBody();
            const t = jest.fn();
            const fail = jest.fn();
            middleware(request, expectNoCall(fail), t);
            expect(t).toHaveBeenCalledTimes(1);
            expect(request.header('content-type')).toEqual('application/json');
        });
        test('does not add default content type if there is no body', () => {
            const middleware = (0, content_type_checker_1.default)();
            const request = mockRequestWithoutBody();
            const t = jest.fn();
            const fail = jest.fn();
            middleware(request, expectNoCall(fail), t);
            expect(t).toHaveBeenCalledTimes(1);
            expect(request.header('content-type')).toEqual(undefined);
        });
        test('should add the first custom content type if provided', () => {
            const middleware = (0, content_type_checker_1.default)('application/yaml', 'application/xml', 'application/x-www-form-urlencoded');
            const request = mockRequestWithBody();
            const t = jest.fn();
            const fail = jest.fn();
            middleware(request, expectNoCall(fail), t);
            expect(t).toHaveBeenCalledTimes(1);
            expect(request.header('content-type')).toEqual('application/yaml');
        });
        test('does not change the content-type if the request already has one', () => {
            const middleware = (0, content_type_checker_1.default)('application/json', 'application/yaml');
            const request = mockRequestWithBody('application/yaml');
            const t = jest.fn();
            const fail = jest.fn();
            middleware(request, expectNoCall(fail), t);
            expect(t).toHaveBeenCalledTimes(1);
            expect(request.header('content-type')).toEqual('application/yaml');
        });
    });
});
//# sourceMappingURL=content-type-checker.test.js.map