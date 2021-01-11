import { IUbirchAccountingTokenData } from './iubirch-accounting-token-data';

export class UbirchAccountingToken {

  public expirationDate: Date;
  public isExpired: boolean;
  public data: IUbirchAccountingTokenData;

  constructor(
    decodedTokenP: any,
    expirationDateP: Date,
    isExpiredP: boolean
  ) {

    this.prepareToken(decodedTokenP);
    this.data = {} as IUbirchAccountingTokenData;
    Object.assign(this.data, decodedTokenP);

    this.expirationDate = expirationDateP;
    this.isExpired = isExpiredP;

    return this;
  }

  /**
   * Token needs to be prepared to easily handle list of things OR wildcard in target_identities
   * @param decodedTokenP
   * @private
   */
  private prepareToken(decodedTokenP: IUbirchAccountingTokenData): void {
    if (decodedTokenP.target_identities && Array.isArray(decodedTokenP.target_identities)) {
      decodedTokenP.valid_for_all = false;
    } else {
      decodedTokenP.target_identities = undefined;
      decodedTokenP.valid_for_all = true;
    }
  }
}
