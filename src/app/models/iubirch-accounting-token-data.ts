export interface IUbirchAccountingTokenData {
  jti: string;                  // jwt token id
  sub: string;                  // subject: tenant userId - who will pay for the use of this token
  purpose: string;              // description of the purpose of this token the user inserted
  target_identities: string[] | string; // list of deviceIds for which this token can be used or "*" this token can be used for every device
  valid_for_all: boolean;       // if this is true this token can be used for every deviceId (if target_identities === "*")
  role: string;                 // role in which this token can be used
  exp?: number;                 // expiration date of this token as unix timestamp
  nbf?: number;                  // not used before date of this token as unix timestamp
  iat: number;                 // issuedAt
  iss: string;                  // issuer: where this token has been created
  aud: string;                  // audience: where can this token be used for
}
