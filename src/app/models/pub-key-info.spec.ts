import { PubKeyInfo } from './pub-key-info';

describe('PubKeyInfo', () => {
  it('should create an instance', () => {
    expect(new PubKeyInfo(
        '{"pubKeyInfo":{hwDeviceId": "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}}'
    )).toBeTruthy();
  });
});
