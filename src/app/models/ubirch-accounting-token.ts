import { IUbirchAccountingTokenData } from './iubirch-accounting-token-data';

export class UbirchAccountingToken {

  public expirationDate: Date;
  public isExpired: boolean;
  public jwt: string;
  public data: IUbirchAccountingTokenData;

  constructor(
    jwtP: string,
    decodedTokenP: any,
    expirationDateP: Date,
    isExpiredP: boolean
  ) {

    this.jwt = jwtP;

    this.data = {} as IUbirchAccountingTokenData;
    Object.assign(this.data, decodedTokenP);

    this.expirationDate = expirationDateP;
    this.isExpired = isExpiredP;

    return this;
  }
}
