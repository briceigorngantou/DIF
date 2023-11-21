import { userMiddleware } from './user.middleware';

describe('userMiddleware', () => {
  it('should be defined', () => {
    expect(new userMiddleware()).toBeDefined();
  });
});
