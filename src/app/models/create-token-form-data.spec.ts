import { CreateTokenFormData } from './create-token-form-data';

describe('CreateTokenFormData', () => {
  it('should create an instance', () => {
    expect(new CreateTokenFormData({})).toBeTruthy();
  });
  it('should create an instance from full data', () => {
    const data = {
      purpose: 'Test Token 1',
      targetIdentities: ['identity1', 'identity2'],
      expiration: '2021-04-30T20:07:52.732+02:00',
      notBefore: '2021-04-01T20:07:52.732+02:00',
      targetGroups: ['group1', 'group2'],
      scopes: ['', ''],
      originDomains: ['https://test.test.de', 'https://ubirch.com']
  };
    expect(new CreateTokenFormData(data)).toBeTruthy();
  });

});
