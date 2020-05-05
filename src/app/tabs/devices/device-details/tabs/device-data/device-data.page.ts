import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.page.html',
  styleUrls: ['./device-data.page.scss'],
})
export class DeviceDataPage implements OnInit {
  private readonly url = environment.deviceData.url;
  private readonly orgId = environment.deviceData.orgId;
  private readonly from = environment.deviceData.from;
  private readonly to = environment.deviceData.to;
  private readonly panelId = environment.deviceData.panelId;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  private readonly uuid = this.route.snapshot.parent.parent.parent.params.id;

  public iframeUrl: SafeResourceUrl = this.sanitize(`${this.url}?orgId=${this.orgId}&from=${this.from}&to=${this.to}&panelId=${this.panelId}&var-uuid=${this.uuid}`);

  ngOnInit() {
  }

  private sanitize(url: string): SafeResourceUrl {
    const sanitized = this.sanitizer.sanitize(SecurityContext.URL, url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(sanitized);
  }

}
