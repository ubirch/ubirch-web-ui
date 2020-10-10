import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DeviceService } from 'src/app/services/device.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { environment } from '../../../../../../environments/environment';
import {BEDevice} from '../../../../../models/bedevice';

@Component({
    selector: 'app-device-data-graph',
    templateUrl: './device-data-graph.page.html',
    styleUrls: ['./device-data-graph.page.scss'],
})
export class DeviceDataGraphPage implements OnInit {
    private readonly url = environment.deviceData.url;
    private readonly orgId = environment.deviceData.orgId;
    private readonly from = environment.deviceData.from;
    private readonly to = environment.deviceData.to;
    private readonly panelMap = environment.deviceData.panelMap;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private deviceService: DeviceService,
    ) {}

    private readonly uuid = this.route.snapshot.parent.parent.parent.params.id;

    public iframeUrl$: Observable<SafeResourceUrl>;

    ngOnInit() {
        this.iframeUrl$ = this.deviceService.observableCurrentDevice.pipe(
            filter((device: BEDevice) => {
                return device && device.hwDeviceId === this.uuid;
            }),
            map(device => {
                const tag = this.deviceService.getAllowedCaimingTagsOfDevice(device) || '';
                const panelId = this.panelMap[ tag ];

                const url = this.url +
                    `?orgId=${this.orgId}` +
                    `&from=${this.from}` +
                    `&to=${this.to}` +
                    `&panelId=${panelId}` +
                    `&var-uuid=${device.hwDeviceId}`;

                return this.sanitize(url);
            }),
        );
    }

    private sanitize(url: string): SafeResourceUrl {
        const sanitized = this.sanitizer.sanitize(SecurityContext.URL, url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(sanitized);
    }

}
