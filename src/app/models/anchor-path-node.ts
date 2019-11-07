export class AnchorPathNode {
  public label: string;
  public timestamp: string; // date-time
  public type: string;
  public hash: string;
  public nextHash: string[];
  public signature: string;

  constructor(jsonNode: any) {
    if (jsonNode) {
      this.label = jsonNode.label;
      this.timestamp = jsonNode.properties.timestamp;
      this.type = jsonNode.properties.type;
      this.hash = jsonNode.properties.hash;
      this.nextHash = jsonNode.properties.next_hash ? [ jsonNode.properties.next_hash ] : [];
      this.signature = jsonNode.properties.signature;
    }
    return this;
  }

  public addNextHash(newNextHash: string) {
    if (!this.nextHash.includes(newNextHash)) {
      this.nextHash.push(newNextHash);
    }
  }
}
