import {Component, OnInit, OnDestroy, Renderer2, Inject} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {DeviceService} from 'src/app/services/device.service';
import {Subscription} from 'rxjs';
import {BEDevice} from '../../../../../models/bedevice';
import {ToastService} from '../../../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../../environments/environment';
import {ToastType} from '../../../../../enums/toast-type.enum';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataSet} from '../../../../../models/data-set';
import {
  UbirchVerification,
  UbirchVerificationWidget,
  UbirchFormUtils,
} from 'node_modules/@ubirch/ubirch-verification-js/dist';

@Component({
    selector: 'app-device-data',
    templateUrl: './device-data.page.html',
    styleUrls: ['./device-data.page.scss'],
    animations: [
        trigger('smoothCollapse', [
            state('initial', style({
                height: '0',
                overflow: 'hidden',
                opacity: '0',
                visibility: 'hidden'
            })),
            state('final', style({
                overflow: 'hidden'
            })),
            transition('initial<=>final', animate('250ms'))
        ]),
        trigger('rotatedState', [
            state('default', style({transform: 'rotate(0)'})),
            state('rotated', style({transform: 'rotate(180deg)'})),
            transition('default <=> rotated', animate('250ms'))
        ])
    ]
})
export class DeviceDataPage implements OnInit, OnDestroy {

    public verificationToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLmRldi51YmlyY2guY29tIiwic3ViIjoiNWQ0ZjUwOWUtMTRmZi00ZDE4LWE3ODEtY2M5YTlkMGRmZTMxIiwiYXVkIjoiaHR0cHM6Ly92ZXJpZnkuZGV2LnViaXJjaC5jb20iLCJleHAiOjE2NDA5NjM5MTQsImlhdCI6MTYyOTkwMTE3MiwianRpIjoiMjE1MGFmYzAtZjViMS00ZmU3LWJlMjgtOWZlMTk4MjQwNWJmIiwic2NwIjpbInVwcDp2ZXJpZnkiXSwicHVyIjoiQ29uc29sZSBUZXN0a2l0IFZlcmlmeSBUZXN0IFRva2VuIiwidGdwIjpbXSwidGlkIjpbIioiXSwib3JkIjpbImh0dHBzOi8vY29uc29sZS5kZXYudWJpcmNoLmNvbSJdfQ.99emMNlSOffdHmcuNBloyRHSPXAKNMK9_efgCeCaHXiEwTrIWsA1HSsZNks_RmHo3sfH5pqXOqmy2UKrsS0k6g';
    private hashAlgo = {
      sha256: 'sha256',
      sha512: 'sha512'
    };
    public selectedHashAlgo = this.hashAlgo.sha256;
    public stage = 'dev';

    public loadedDevice: BEDevice;
    private deviceSubsc: Subscription;
    private dataSubsc: Subscription;
    private dataSets;

    showBody = false;
    private ubirchVerification: any[] = new Array(environment.lashHashesListLength);
    private ubirchVerificationWidget: any[] = new Array(environment.lashHashesListLength);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
        private deviceService: DeviceService,
        private toast: ToastService,
        private translateService: TranslateService,
        private renderer2: Renderer2,
    ) {
    }

    get CURRENT_LANG(): string {
        return this.translateService.currentLang;
    }

    ngOnInit() {
        this.deviceSubsc = this.deviceService.observableCurrentDevice.subscribe(
            loadedDevice => {
                this.loadedDevice = loadedDevice;
                if (this.loadedDevice) {
                    this.dataSubsc = this.deviceService.getLastNDatasetsOfDevice(
                        this.loadedDevice.hwDeviceId,
                        environment.lashHashesListLength).subscribe(
                        (resp: DataSet[]) => {
                          this.dataSets = resp;
                        }, // replace
                        (_: Error) => this.handleError('error.device.details.recent-data.load.failed', undefined, [])
                    );
                }
            },
            (_: Error) => this.handleError('error.device.details.unavailable', undefined, [])
        );
    }

    public openVerification(item): void {
        const navigationExtras: NavigationExtras = {
            queryParams: {hash: item.hash, deviceId: this.loadedDevice.hwDeviceId}
        };
        this.router.navigate(['verification'], navigationExtras);
    }

    ngOnDestroy(): void {
        if (this.dataSubsc) {
            this.dataSubsc.unsubscribe();
        }
        if (this.deviceSubsc) {
            this.deviceSubsc.unsubscribe();
        }
    }

    public toggled(visibleP: boolean, indexP: number): void {
      if (visibleP && !this.ubirchVerification[indexP]) {
        this.ubirchVerification[indexP] = new UbirchVerification({
            // @ts-ignore
            algorithm: this.selectedHashAlgo,
            // @ts-ignore
            stage: this.stage,
            accessToken: this.verificationToken,
            OPEN_CONSOLE_IN_SAME_TARGET: true,
            // @ts-ignore
            language: this.CURRENT_LANG === 'de' || this.CURRENT_LANG === 'en' ?  this.CURRENT_LANG : 'en'
        });
        this.ubirchVerificationWidget[indexP] = new UbirchVerificationWidget({
          // @ts-ignore
          elementSelector: '#verification-widget_' + indexP,
          messenger: this.ubirchVerification[indexP].messenger,
          OPEN_CONSOLE_IN_SAME_TARGET: true
        })
      }
    }

    private async handleError(messageKey: string, params?: any, payload?: any) {
        if (payload) {
            // this.dataSets = payload;
        }
        this.toast.openToast(ToastType.danger, messageKey, 10000, undefined, params);
    }

    public toggle(): void {
        this.showBody = !this.showBody;
    }

    public verifyForm(indexP: number, dataSet): void {
        try {
            const genJson = JSON.stringify(dataSet);
          const hash = this.ubirchVerification[indexP].createHash(genJson);
          this.ubirchVerification[indexP].verifyHash(hash);
        } catch (e) {
            // handle the error yourself and inform user about the missing fields
            console.log(e);
            // end of error handling for missing fields
        }
    }
}
