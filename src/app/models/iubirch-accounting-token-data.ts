export interface IUbirchAccountingTokenData {
  jti: string;                  // jwt token id
  sub: string;                  // subject: tenant userId - who will pay for the use of this token
  pur: string;              // description of the purpose of this token the user inserted
  tid: string[];            // list of deviceIds for which this token can be used or "*" this token can be used for every device
  exp?: number;                 // expiration date of this token as unix timestamp
  nbf?: number;                  // not used before date of this token as unix timestamp
  iat: number;                 // issuedAt
  iss: string;                  // issuer: where this token has been created
  aud: string;                  // audience: where can this token be used for
  ord: string[];                  // origin Domains
  scp: string[];                //  scope
  tgp: string[];                // target groups
}
