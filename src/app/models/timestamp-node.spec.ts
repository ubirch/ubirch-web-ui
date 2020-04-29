import { TimestampNode } from './timestamp-node';

describe('TimestampNode', () => {
  it('should create an instance', () => {
    const jsonNode = {
      timestamp: 1587995107945,
      hash: 'xxxxxxxxxxxx',
    };

    expect(new TimestampNode(jsonNode)).toBeTruthy();
  });
});
