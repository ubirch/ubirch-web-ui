import {AnchorPathNode} from './anchor-path-node';

export class TimestampNode extends AnchorPathNode {
  /** hash as reference to the node this timestamp belongs to */
  public refHash: string;
  constructor(jsonNode: any) {
    super(jsonNode);
    if (jsonNode && jsonNode.properties) {
      this.label = jsonNode.properties.timestamp;
      this.refHash = jsonNode.properties.hash;
      this.hash = 'timestamp_' + jsonNode.properties.hash;
      this.type = 'TIMESTAMP';
      }
    return this;
  }
}
