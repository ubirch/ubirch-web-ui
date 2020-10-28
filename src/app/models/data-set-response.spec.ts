import {DataSetResponse} from './data-set-response';

const TESTDATA: any = {
  responses: [
    {
      uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
      timestamp: '2020-10-28T16:57:00Z',
      value: {
        humidity: 35.41758,
        temperature: 23.299591,
        voltage: 4762
      }
    },
    {
      uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
      timestamp: '2020-10-28T16:56:30Z',
      value: {
        humidity: 35.38284,
        temperature: 23.43037,
        voltage: 4760
      }
    },
    {
      uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
      timestamp: '2020-10-28T16:56:00Z',
      value: {
        humidity: 35.40721,
        temperature: 23.527798,
        voltage: 4782
      }
    },
    {
      uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
      timestamp: '2020-10-28T16:55:00Z',
      value: {
        humidity: 35.379925,
        temperature: 23.915953,
        voltage: 4768
      }
    },
    {
      uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
      timestamp: '2020-10-28T16:54:30Z',
      value: {
        humidity: 35.51452,
        temperature: 24.092062,
        voltage: 4788
      }
    }
  ]
};

describe('DataSetResponse', () => {
  it('should create an instance', () => {
    expect(new DataSetResponse(TESTDATA)).toBeTruthy();
  });
});
