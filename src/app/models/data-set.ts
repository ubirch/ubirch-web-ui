export class DataSet {
  public uuid: string;
  public timestamp: string;
  public value: any;

  constructor(props) {
    Object.assign(this, props);

    return this;
  }
}
