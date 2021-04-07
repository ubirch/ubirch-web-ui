export class UbirchAccountingTokenCreationData {

  public tenantId: string;
  public purpose: string;
  public targetIdentities: string[];
  public expiration?: number;
  public notBefore?: number;
  public scopes: string[];
  public originDomains: string[];
  public targetGroups?: string[];


  constructor(props) {
    Object.assign(this, props);
    return this;
  }

}
