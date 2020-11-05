import {AnchorPathNode} from './anchor-path-node';
import {formatDate} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {DateTimeFormats} from '../enums/date-time-formats.enum';

export class TimestampNode extends AnchorPathNode {
  /** hash as reference to the node this timestamp belongs to */
  public refHash: string;
  constructor(jsonNode: any, translation?: TranslateService) {
    super(jsonNode);
    if (jsonNode && jsonNode.properties) {
      const language = translation ? translation.currentLang : 'en-US';
      this.label = formatDate(jsonNode.properties.timestamp, DateTimeFormats.TECHNICAL_DATE, language) + '\n'
        + formatDate(jsonNode.properties.timestamp, DateTimeFormats.TECHNICAL_TIME, language) + '\n'
        + formatDate(jsonNode.properties.timestamp, DateTimeFormats.TECHNICAL_TIMEZONE, language);
      this.refHash = jsonNode.properties.hash;
      this.hash = 'timestamp_' + jsonNode.properties.hash;
      this.type = 'TIMESTAMP';
      }
    return this;
  }
}
