export class CreateTokenFormData {

  public purpose: string;
  public targetIdentities: string[];
  public validForAll: boolean;
  public expiration?: number;
  public notBefore?: number;

  constructor(props) {
    Object.assign(this, props);
    return this;
  }
}
