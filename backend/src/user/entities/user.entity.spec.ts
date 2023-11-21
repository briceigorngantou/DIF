import { userEntity } from './user.entity';

describe('userEntity', () => {
  it('should be defined', () => {
    expect(new userEntity()).toBeDefined();
  });
});
