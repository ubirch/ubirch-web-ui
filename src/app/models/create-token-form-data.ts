export class CreateTokenFormData {

  public purpose: string;
  public targetIdentities: string[];
  public expiration?: number;
  public notBefore?: number;
  public scopes: string[];
  public originDomains: string[];

  constructor(props) {
    Object.assign(this, props);

    this.expiration = this.convertDateToInterval(this.expiration);
    this.notBefore = this.convertDateToInterval(this.notBefore);

    return this;
  }

  private convertDateToInterval(dateP: number): number {
    if (!dateP) {
      return undefined;
    }
    return (new Date(dateP).getTime() - Date.now()) / 1000;
  }
}
