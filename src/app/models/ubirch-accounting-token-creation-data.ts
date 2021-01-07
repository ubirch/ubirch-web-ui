export class UbirchAccountingTokenCreationData {

  public tenantId: string;
  public purpose: string;
  public targetIdentities: string[] | string;
  public expiration?: number;
  public notBefore?: number;

  constructor(props) {
    Object.assign(this, props);
    return this;
  }

}
