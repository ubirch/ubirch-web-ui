import { Injectable } from '@angular/core';
import {isNumber} from 'util';

@Injectable({
  providedIn: 'root'
})
export class UbirchWebUIUtilsService {

  constructor() { }

  static defaultPageSize = 20;

  public static addParamsToURL(url: string, pageNum: number, pageSize: number): string {

    if (pageNum !== undefined && pageNum >= 0) {

      // inizialize pageSize if not defined by paginator
      if (pageSize === undefined) {
        pageSize = this.defaultPageSize;
      }

      url += `/page/${pageNum}/size/${pageSize}`;
    }
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
    if (!isNaN(value) && isNumber(+value)) {
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

}
