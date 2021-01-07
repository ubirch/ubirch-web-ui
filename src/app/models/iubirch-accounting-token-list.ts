import { IUbirchAccountingJWT } from './iubirch-accounting-jwt';

export interface IUbirchAccountingTokenList {
  version: string;
  ok: boolean;
  data: IUbirchAccountingJWT[];
}
