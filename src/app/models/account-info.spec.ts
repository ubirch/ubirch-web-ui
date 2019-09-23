import { AccountInfo } from './account-info';

describe('AccountInfo', () => {
  it('should create an instance', () => {
    expect(new AccountInfo({user: {username: 'new-user'}, numberOfDevices: 0})).toBeTruthy();
  });
});
