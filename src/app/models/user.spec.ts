import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(
        '{"user":{"id":"d63ecc03-f5a7-4d43-91d0-a30d034d8da3","username":"testa.rosa.best@gmail.com",' +
        '"lastname":"Testa","firstname":"Rosa"},"numberOfDevices":1}'
    )).toBeTruthy();
  });
});
