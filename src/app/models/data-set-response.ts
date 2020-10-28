import {DataSet} from './data-set';

export class DataSetResponse {
  public responses: DataSet[];

  constructor(props) {
    Object.assign(this, props);

    return this;
  }
}
