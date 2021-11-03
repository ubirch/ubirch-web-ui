import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UbirchVerificationWidget } from 'node_modules/@ubirch/ubirch-verification-js/dist';
import { Subscription } from 'rxjs';

import { DeviceService } from 'src/app/services/device.service';
import { environment } from '../../../../../../environments/environment';
import { ToastType } from '../../../../../enums/toast-type.enum';
import { BEDevice } from '../../../../../models/bedevice';
import { DataSet } from '../../../../../models/data-set';
import { ToastService } from '../../../../../services/toast.service';

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

    public verificationToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLmRldi51YmlyY2guY29tIiwic3ViIjoiYzBiNTc3ZmItMWNlZi00YzZmLThjNTAtOGQzYTFlNmVhNzUzIiwiYXVkIjoiaHR0cHM6Ly92ZXJpZnkuZGV2LnViaXJjaC5jb20iLCJleHAiOjE2NDA5Mzk2OTYsImlhdCI6MTYzMjI5NjEyMiwianRpIjoiNzkzMGQ0MWQtNTVmNi00ODgyLWE2ZjItMGRkOWI2NDUwMjA2Iiwic2NwIjpbInVwcDp2ZXJpZnkiXSwicHVyIjoiV2lsZGNhcmQgQ09OU09MRSBWZXJpZmljYXRpb24gVG9rZW4gKExPQ0FMSE9TVCkiLCJ0Z3AiOltdLCJ0aWQiOlsiKiJdLCJvcmQiOltdfQ.MUzGibZZ6DU91RBxaDYm9D7-TsF1QFappn2MjTUFEylXjkDAzHG-e-cuPjSvYEx2ugjS2ftsC9QLI-BZBn3yDw';
    private hashAlgo = {
      sha256: 'sha256',
      sha512: 'sha512'
    };
    public selectedHashAlgo = this.hashAlgo.sha256;
    public stage = environment.envName;

    public loadedDevice: BEDevice;
    private deviceSubsc: Subscription;
    private dataSubsc: Subscription;
    private dataSets;

    showBody = false;
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
      if (visibleP && !this.ubirchVerificationWidget[indexP]) {
        const elem = document.querySelector(`#verification-widget_${indexP}`);
        console.log(`ElementID: ${indexP} `, elem);
        this.ubirchVerificationWidget[indexP] = new UbirchVerificationWidget({
            // @ts-ignore
            algorithm: this.selectedHashAlgo,
            // @ts-ignore
            stage: this.stage || 'prod',
            accessToken: this.verificationToken,
            OPEN_CONSOLE_IN_SAME_TARGET: true,
            // @ts-ignore
            language: this.CURRENT_LANG === 'de' || this.CURRENT_LANG === 'en' ?  this.CURRENT_LANG : 'en',
            hostSelector: `#verification-widget_${indexP}`,
        });
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
          const hash = this.ubirchVerificationWidget[indexP].createHash(genJson);
          this.ubirchVerificationWidget[indexP].verifyHash(hash);
        } catch (e) {
            // handle the error yourself and inform user about the missing fields
            console.log(e);
            // end of error handling for missing fields
        }
    }
}
