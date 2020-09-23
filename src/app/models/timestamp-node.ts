import {AnchorPathNode} from './anchor-path-node';
import {formatDate} from '@angular/common';

export class TimestampNode extends AnchorPathNode {
  /** hash as reference to the node this timestamp belongs to */
  public refHash: string;
  constructor(jsonNode: any) {
    super(jsonNode);
    if (jsonNode && jsonNode.properties) {
      this.label = formatDate(jsonNode.properties.timestamp, 'dd.MM.yyyy\nHH:mm:ss', 'en-US');
      this.refHash = jsonNode.properties.hash;
      this.hash = 'timestamp_' + jsonNode.properties.hash;
      this.type = 'TIMESTAMP';
      }
    return this;
  }
}
