import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {DeviceService} from 'src/app/services/device.service';
import {Subscription} from 'rxjs';
import {BEDevice} from '../../../../../models/bedevice';
import {ToastService} from '../../../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../../environments/environment';
import {ToastType} from '../../../../../enums/toast-type.enum';

@Component({
    selector: 'app-device-data',
    templateUrl: './device-data.page.html',
    styleUrls: ['./device-data.page.scss'],
})
export class DeviceDataPage implements OnInit, OnDestroy {

    public loadedDevice: BEDevice;
    private deviceSubsc: Subscription;
    private dataSubsc: Subscription;
    private dataSets;
    private testResponse = [
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:47:16Z',
            value: {
                humidity: 40.70737,
                temperature: 22.982014,
                voltage: 4764
            },
            hash: 'Y/X1go7q/nANU35tIc7wdvZweBf5Qu/gXwxmO4m558EN3H99S6lM2fcsmCOQyCjVrwg20FDi5H2WasauQ9inhg=='
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:46:46Z',
            value: {
                humidity: 40.766777,
                temperature: 23.184547,
                voltage: 4758
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:46:16Z',
            value: {
                humidity: 40.886818,
                temperature: 23.274681,
                voltage: 4770
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:45:46Z',
            value: {
                humidity: 40.856995,
                temperature: 23.496204,
                voltage: 4768
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:45:16Z',
            value: {
                humidity: 40.980247,
                temperature: 23.276114,
                voltage: 4760
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:44:46Z',
            value: {
                humidity: 40.87346,
                temperature: 23.342234,
                voltage: 4766
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:44:16Z',
            value: {
                humidity: 40.839836,
                temperature: 23.232008,
                voltage: 4764
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:43:46Z',
            value: {
                humidity: 40.879536,
                temperature: 23.047941,
                voltage: 4782
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:43:16Z',
            value: {
                humidity: 41.016983,
                temperature: 23.19029,
                voltage: 4760
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:42:46Z',
            value: {
                humidity: 41.056778,
                temperature: 23.224834,
                voltage: 4794
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:42:16Z',
            value: {
                humidity: 40.952835,
                temperature: 23.190338,
                voltage: 4764
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:41:46Z',
            value: {
                humidity: 41.003372,
                temperature: 23.071955,
                voltage: 4764
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:41:16Z',
            value: {
                humidity: 41.032192,
                temperature: 22.964413,
                voltage: 4766
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:40:46Z',
            value: {
                humidity: 41.12613,
                temperature: 23.12771,
                voltage: 4776
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:40:16Z',
            value: {
                humidity: 41.171745,
                temperature: 23.288874,
                voltage: 4760
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:39:46Z',
            value: {
                humidity: 41.236626,
                temperature: 23.213526,
                voltage: 4776
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:39:16Z',
            value: {
                humidity: 41.322826,
                temperature: 23.202133,
                voltage: 4738
            }
        },
        {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            timestamp: '2020-10-12T11:38:46Z',
            value: {
                humidity: 41.185852,
                temperature: 23.396019,
                voltage: 4758
            }
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
        private deviceService: DeviceService,
        private toast: ToastService,
        private translateService: TranslateService
    ) {
    }

    get CURRENT_LANG(): string {
        return this.translateService.currentLang;
    }

    ngOnInit() {
        this.dataSets = this.testResponse;
        this.deviceSubsc = this.deviceService.observableCurrentDevice.subscribe(
            loadedDevice => {
                this.loadedDevice = loadedDevice;
                if (this.loadedDevice) {
                    this.dataSubsc = this.deviceService.getLastNDatasetsOfDevice(
                        this.loadedDevice.hwDeviceId,
                        environment.lashHashesListLength).subscribe(
                        (resp: object[]) => console.log(this.dataSets), // replace
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

    private async handleError(messageKey: string, params?: any, payload?: any) {
        if (payload) {
            // this.dataSets = payload;
        }
        this.toast.openToast(ToastType.danger, messageKey, 10000, undefined, params);
    }

}
