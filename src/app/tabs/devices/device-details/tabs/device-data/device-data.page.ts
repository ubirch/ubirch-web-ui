import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {DeviceService} from 'src/app/services/device.service';
import {Subscription} from 'rxjs';
import {BEDevice} from '../../../../../models/bedevice';
import {UppHash} from '../../../../../models/upp-hash';
import {ToastService} from '../../../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-device-data',
    templateUrl: './device-data.page.html',
    styleUrls: ['./device-data.page.scss'],
})
export class DeviceDataPage implements OnInit {

    public loadedDevice: BEDevice;
    private deviceSubsc: Subscription;
    private x;
    private dataSets;
    private testResponse = [
        {
        _index: 'device_data_vizualizer',
        _type: 'doc',
        _id: 'HETj_HQBcutxaSTbrImN',
        _version: 1,
        _score: null,
        _source: {
            uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
            msg_type: 1,
            timestamp: '2020-10-06T07:50:10.000Z',
            data: {
                humidity: 40.843945,
                temperature: 21.767498,
                voltage: 4760
            },
            hash: 'Y/X1go7q/nANU35tIc7wdvZweBf5Qu/gXwxmO4m558EN3H99S6lM2fcsmCOQyCjVrwg20FDi5H2WasauQ9inhg=='
        },
        fields: {
            timestamp: [
                '2020-10-06T07:50:10.000Z'
            ]
        },
        sort: [
            1601970610000
        ]
    },
        {
            _index: 'device_data_vizualizer',
            _type: 'doc',
            _id: 'HETj_HQBcutxaSTbrImN',
            _version: 1,
            _score: null,
            _source: {
                uuid: '55424952-30ae-a44e-4f40-30aea44e4f40',
                msg_type: 1,
                timestamp: '2020-10-06T07:50:10.000Z',
                data: {
                    humidity: 40.843945,
                    temperature: 21.767498,
                    voltage: 4760
                },
                hash: 'Y/X1go7q/nANU35tIc7wdvZweBf5Qu/gXwxmO4m558EN3H99S6lM2fcsmCOQyCjVrwg20FDi5H2WasauQ9inhg=='
            },
            fields: {
                timestamp: [
                    '2020-10-06T07:50:10.000Z'
                ]
            },
            sort: [
                1601970610000
            ]
        }
    ];
    private currentData;

    private readonly uuid = this.route.snapshot.parent.parent.parent.params.id;

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
        this.deviceSubsc = this.deviceService.observableCurrentDevice.subscribe(
            loadedDevice => {
                this.loadedDevice = loadedDevice;
            });
        this.deviceService.getLastNHashesOfDevice(this.loadedDevice.hwDeviceId).subscribe(x => {
            console.log(x);
        });
        this.dataSets = [];
        for (let i of this.testResponse) {
            this.dataSets.push(i);
        }
        console.log(this.dataSets[1]._source.data);
    }

    public openVerification(item): void {
        const navigationExtras: NavigationExtras = {
            queryParams: {hash: item._source.hash, deviceId: this.loadedDevice.hwDeviceId}
        };
        this.router.navigate(['verification'], navigationExtras);
    }

}
