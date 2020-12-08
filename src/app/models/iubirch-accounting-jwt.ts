export interface IUbirchAccountingJWT {
  id: string;         // token id
  ownerId: string;    // tenant who pays for use of this token
  tokenValue: string; // JWT containing the token content
  category: string;   // scope: verification, anchoring, claiming, creation, etc.
  createdAt: string;  // date-time string
}
