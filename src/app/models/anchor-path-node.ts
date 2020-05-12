export class AnchorPathNode {
  public label: string;
  public parent: string;
  public timestamp: string; // date-time
  public type: string;
  public hash: string;
  public nextHash: string[];
  public signature: string;
  public indexInChain: number;

  constructor(jsonNode: any) {
    if (jsonNode) {
      this.label = jsonNode.label;
      this.parent = jsonNode.parent;
      if (jsonNode.properties) {
        this.timestamp = jsonNode.properties.timestamp;
        this.type = jsonNode.label;
        this.hash = jsonNode.properties.hash;
        this.nextHash = jsonNode.properties.next_hash ? jsonNode.properties.next_hash.split(',') : [];
        this.signature = jsonNode.properties.signature;
      }
    }
    return this;
  }

  public addNextHash(newNextHash: string) {
    if (!this.nextHash.includes(newNextHash)) {
      this.nextHash.push(newNextHash);
    }
  }
}
