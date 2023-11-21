import { CompanyMiddleware } from './company.middleware';

describe('CompanyMiddleware', () => {
  it('should be defined', () => {
    expect(new CompanyMiddleware()).toBeDefined();
  });
});
