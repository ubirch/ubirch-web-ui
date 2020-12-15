export interface IUbirchAccountingTokenCreationResponse {
  version: string;
  ok: boolean;
  data: {
    id: string;
    jwtClaim: any;
    token: string;
  };
}
