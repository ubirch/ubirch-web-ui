import { UppHash } from './upp-hash';

describe('UppHash', () => {
  it('should create an instance if a upp hash has been found', () => {
    expect(new UppHash({
      deviceId: '55424952-30ae-a44e-4f40-30aea44e4f40',
      hash: 'WC7B9qbwn5A4oU/I6/0IJ+NzmBDG63QO6hXe7KuU2ul4yAPc3CldKd5CKKbhf0qXZJAva0CLXWTz00tr3F9BeQ==',
      timestamp: '2020-07-03T09:51:36.000Z'
    })).toBeTruthy();
  });
});
