import {Injectable} from '@angular/core';
import {Point} from '../models/point';
import {TrustService} from './trust.service';

@Injectable({
  providedIn: 'root'
})
export class CytoscapeGraphService {

  private layoutSettings = [
    { type: 'UPP',
      nodeIcon: 'assets/app-icons/ubirch_verify_right.png'},
    { type: 'UPP_UNSIGNED',
      nodeIcon: 'assets/app-icons/ubirch_verify_notyet.png'},
    { type: 'FOUNDATION_TREE',
      nodeIcon: 'assets/app-icons/foundation-tree.png'},
    { type: 'MASTER_TREE',
      nodeIcon: 'assets/app-icons/master-tree.png'},
    { type: 'PUBLIC_CHAIN',
      nodeIcon: 'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'},
    { type: 'TIMESTAMP',
      nodeIcon: 'assets/app-icons/time_tick.png'}
  ];
  private layoutSettingsInitialized = false;

  private currentZoomFactorDefault = 1;
  // tslint:disable-next-line:variable-name
  private _currentZoomFactor = this.currentZoomFactorDefault;

  private currentPanPosDefault = new Point(0, 0);
  // tslint:disable-next-line:variable-name
  private _currentPanPos = this.currentPanPosDefault;

  constructor() {}

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

  public get LAYOUT_SETTINGS(): any[] {
    if (!this.layoutSettingsInitialized) {
      this.initializeBlockchainNodes();
    }
    return this.layoutSettings;
  }

  private initializeBlockchainNodes(): void {
    if (TrustService.BlockchainSettings) {
      const bcNames: string[] = Object.keys(TrustService.BlockchainSettings);
      bcNames.forEach((bc: string) => {
        try {
          const bcIconSettings = {
            type: bc,
            nodeIcon: TrustService.BlockchainSettings[bc].nodeIcon
          };
          this.layoutSettings.push(bcIconSettings);
        } catch (e) {
          console.log(`Cannot find icon for ${bc} - please add it to resources/blockchain-settings.json`);
        }
      });
    }
    this.layoutSettingsInitialized = true;
  }
}
