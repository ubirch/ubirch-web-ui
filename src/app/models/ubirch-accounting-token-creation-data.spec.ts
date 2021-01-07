import { UbirchAccountingTokenCreationData } from './ubirch-accounting-token-creation-data';

describe('IUbirchAccountingTokenCreationData', () => {
  it('should create an instance', () => {
    expect(new UbirchAccountingTokenCreationData({})).toBeTruthy();
  });
});
