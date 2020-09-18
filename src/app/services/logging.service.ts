import { Injectable } from '@angular/core';
import {ToastType} from '../enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private debugLevelThreshhold = 5;

  constructor() { }

  /**
   * logs message to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public log(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.log(logStr);
  }

  /**
   * debug message to browser console (no output in production mode)
   * @param msg - what happened?
   * @param debugLevel - (optional, default: 5) defines how important this debug statement is;
   * the lower the number the more important the debug message is
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public debug(msg: string, debugLevel?: number, operation?: string, caller?: string) {
    if (!debugLevel) {
      debugLevel = 5;
    }
    if (debugLevel >= this.debugLevelThreshhold) {
      const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
      console.log(logStr);
    }
  }

  /**
   * error message to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public error(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.error(logStr);
  }

  /**
   * warning to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public warn(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.warn(logStr);
  }

  public logToast(type: ToastType, msg: string) {
    switch (type) {
      case ToastType.danger:
        this.error(msg);
        break;
      case ToastType.success:
        this.debug(msg, 1);
        break;
      case ToastType.light:
      default:
        this.debug(msg, 3);
    }
  }
}
