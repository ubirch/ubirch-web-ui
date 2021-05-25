export class CreateTokenFormData {

  public purpose: string;
  public targetIdentities: string[];
  public expiration?: number;
  public notBefore?: number;
  public targetGroups?: string[];
  public scopes: string[];
  public originDomains: string[];

  constructor(props) {
    this.purpose = props.purpose;

    if (props.validForAll === true) {
      this.targetIdentities = ['*'];
    } else {
      this.targetIdentities = this.extractArray(props.targetIdentities);
    }
    this.expiration = this.convertDateToInterval(props.expiration);
    this.notBefore = this.convertDateToInterval(props.notBefore);
    this.targetGroups = this.extractArray(props.targetGroups);
    this.scopes = this.extractArray(props.scopes);
    this.originDomains = this.extractArray(props.originDomains);
    return this;
  }

  private extractArray(data: string|string[]): string[] {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [data];
    }
    return data;
  }

  private convertDateToInterval(dateP: number): number {
    if (!dateP) {
      return undefined;
    }
    return (new Date(dateP).getTime() - Date.now()) / 1000;
  }
}
