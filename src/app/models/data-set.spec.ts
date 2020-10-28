import {DataSet} from './data-set';

const TESTDATA: any = {
  uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
  timestamp: '2020-10-28T16:57:00Z',
  value: {
    humidity: 35.41758,
    temperature: 23.299591,
    voltage: 4762
  }
};

const TESTDATA2: any = {
  uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
  timestamp: '2020-10-28T16:58:00Z',
  value: {
    a: 35.41758,
    b: 23.299591,
    c: 4762,
    d: 4762
  }
};

const TESTDATA3: any = {
  uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
  timestamp: '2020-10-28T16:58:00Z',
  value: {
    x: '35.41758',
    y: '23.299591',
    z: 'hallo'
  }
};

describe('DataSet', () => {
  it('should create a testkit instance', () => {
    expect(new DataSet(TESTDATA)).toBeTruthy();
  });

  it('should create an instance with other type of data', () => {
    expect(new DataSet(TESTDATA2)).toBeTruthy();
  });

  it('should create an instance with other type of data containing strings', () => {
    expect(new DataSet(TESTDATA3)).toBeTruthy();
  });
});
