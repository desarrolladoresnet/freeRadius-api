import { LogMiddleware } from './log-middleware.middleware';

describe('LogMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LogMiddleware()).toBeDefined();
  });
});