import {AnchorPathNode} from './anchor-path-node';
import {formatDate} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

export class TimestampNode extends AnchorPathNode {
  /** hash as reference to the node this timestamp belongs to */
  public refHash: string;
  constructor(jsonNode: any, translation?: TranslateService) {
    super(jsonNode);
    if (jsonNode && jsonNode.properties) {
      const language = translation ? translation.currentLang : 'en-US';
      this.label = formatDate(jsonNode.properties.timestamp, 'shortDate', language) + '\n'
        + formatDate(jsonNode.properties.timestamp, 'shortTime', language) + '\n'
        + formatDate(jsonNode.properties.timestamp, 'z', language);
      this.refHash = jsonNode.properties.hash;
      this.hash = 'timestamp_' + jsonNode.properties.hash;
      this.type = 'TIMESTAMP';
      }
    return this;
  }
}
