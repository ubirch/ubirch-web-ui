import { Group } from './group';

describe('Group', () => {
  it('should create an instance', () => {
    expect(new Group(
        '{"id": "group_id_4_testing","name": "Testing Group"}'
    )).toBeTruthy();
  });
});
