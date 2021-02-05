export class CreateTokenFormData {

  public purpose: string;
  public targetIdentities: string[];
  public validForAll: boolean;
  public expiration?: number;
  public notBefore?: number;

  constructor(props) {
    Object.assign(this, props);

    this.expiration = this.convertDateToInterval(this.expiration);
    this.notBefore = this.convertDateToInterval(this.notBefore);

    this.cleanupTargetIdentitiesIfValidForAllSelected();

    return this;
  }

  private cleanupTargetIdentitiesIfValidForAllSelected(): void {
    if (this.validForAll) {
      this.targetIdentities = undefined;
    }
  }

  private convertDateToInterval(dateP: number): number {
    if (!dateP) {
      return undefined;
    }
    return (new Date(dateP).getTime() - Date.now()) / 1000;
  }
}
