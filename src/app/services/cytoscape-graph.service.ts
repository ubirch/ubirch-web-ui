import {Injectable} from '@angular/core';
import {Point} from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class CytoscapeGraphService {

  private currentZoomFactorDefault = 1;
  // tslint:disable-next-line:variable-name
  private _currentZoomFactor = this.currentZoomFactorDefault;

  private currentPanPosDefault = new Point(0, 0);
  // tslint:disable-next-line:variable-name
  private _currentPanPos = this.currentPanPosDefault;

  constructor() {
  }

  public get currentZoomFactor(): number {
    return this._currentZoomFactor;
  }

  public set currentZoomFactor(zoomFactor: number) {
    this._currentZoomFactor = zoomFactor;
  }

  public get currentPan(): Point {
    return this._currentPanPos;
  }

  public set currentPan(panPos: Point) {
    this._currentPanPos = panPos;
  }

  public resetAll() {
    this._currentZoomFactor = this.currentZoomFactorDefault;
    this._currentPanPos = this.currentPanPosDefault;
  }
}
