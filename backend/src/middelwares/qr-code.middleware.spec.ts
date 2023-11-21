import { QrCodeMiddleware } from './qr-code.middleware';

describe('QrCodeMiddleware', () => {
  it('should be defined', () => {
    expect(new QrCodeMiddleware()).toBeDefined();
  });
});
