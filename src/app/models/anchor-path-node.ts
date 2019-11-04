export class AnchorPathNode {
  public label: string;
  public timestamp: string; // date-time
  public type: string;
  public hash: string;
  public nextHash: string;
  public prevHash: string;
  public signature: string;

  constructor(jsonNode: any) {
    if (jsonNode) {
      this.label = jsonNode.label;
      this.timestamp = jsonNode.timestamp;
      this.type = jsonNode.type;
      this.hash = jsonNode.hash;
      this.nextHash = jsonNode.next_hash;
      this.prevHash = jsonNode.prev_hash;
      this.signature = jsonNode.signature;
    }
    return this;
  }
}
