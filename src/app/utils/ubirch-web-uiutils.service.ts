import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import {isNumeric} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class UbirchWebUIUtilsService {

  constructor() { }

  static defaultPageSize = 20;

  public static addParamsToThingsListPaginationURL(url: string, pageNum: number, pageSize: number): string {

    if (pageNum !== undefined && pageNum >= 0) {

      // inizialize pageSize if not defined by paginator
      if (pageSize === undefined) {
        pageSize = this.defaultPageSize;
      }

      url = this.addParamsToURL(url, ['page', `${pageNum}`, 'size', `${pageSize}`]);
    }
    return url;

  }

  public static addParamsToURL(url: string, params: string[]): string {

    params.forEach(
      param => url += `/${param}`
    );
    return url;

  }

  static parseBoolean(value: any): boolean {
    if (value === true || value === false) {
      return value;
    }
    if (value.toUpperCase() === 'TRUE') {
      return true;
    } else if (value.toUpperCase() === 'FALSE') {
      return false;
    }
    throw new Error(`parseBoolean called with a non boolean value: ${value}`);
  }

  static parseNumber(value: any): number {
    if (!isNaN(value) && isNumeric(+value)) {
      return parseFloat(value);
    }
    throw new Error(`parseNumber called with a non numerical value: ${value}`);
  }

  static parseString(value: any): string {
      if (!value) {
          return '';
      } else {
          return value.toString();
      }
  }

  public static copyToClipboard(val: string) {
    /* To copy any Text */
    navigator.clipboard.writeText(val);
  }

  public static mapToArray(input: Map<string, any>): any[] {
    const keysOfMap = Array.from(input.keys());

    return keysOfMap.map(key => input.get(key));
  }

  public static createClaimingTagsFromFormData(tags: any): string[] {
    if (!tags) {
      return [];
    }
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim());
    }
    return tags;
  }

  /**
   * Helper to unsubscribe with check if subcription exists
   * @param subscr Subscription which should be unsubscribed
   */
  public safeUnsubscribe(subscr: Subscription): void {
    if (subscr) {
      subscr.unsubscribe();
    }
  }
}
