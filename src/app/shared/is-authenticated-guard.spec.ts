import { IsAuthenticatedGuard } from './is-authenticated-guard';

describe('IsAuthenticatedGuard', () => {
  it('should create an instance', () => {
    expect(new IsAuthenticatedGuard()).toBeTruthy();
  });
});
