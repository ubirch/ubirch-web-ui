import { ErrorMessage } from './error-message';

describe('ErrorMessage', () => {
  it('should create an instance', () => {
    expect(new ErrorMessage('testMessage',
        new Map([
          ['default', 'This is a test messsage'],
          ['de', 'Dies ist eine Testnachricht'],
          ['en', 'This is a test messsage']
        ]))).toBeTruthy();
  });
});
