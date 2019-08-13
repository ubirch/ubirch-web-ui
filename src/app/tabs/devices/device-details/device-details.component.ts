import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {

  deviceDetailsForm: FormGroup;
  id: string;

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.deviceDetailsForm = this.fb.group({
        hwDeviceId: [''],
        description: [''],
        deviceType: [''],
        deviceConfig: [''],
        apiConfig: ['']
      });
      this.patchForm();

      this.deviceService.loadDevice(this.id)
        .subscribe(
            loadedDevice =>  {
              this.patchDevice(new Device(loadedDevice));
              this.watchFormControls();
            }
        );
    } else {
      // TODO: handle url missmatch!!!!
    }
  }

  private patchForm(device?: Device): any {
    const val = {
      hwDeviceId: device ? device.hwDeviceId : '',
      description: device ? device.description : '',
      deviceType: device ? device.deviceType : '',
      deviceConfig: device ? this.getPrettyJSON(device.deviceConfig) : '',
      apiConfig: device ? this.getPrettyJSON(device.apiConfig) : ''
    };
    return val;
  }

  private patchDevice(device: Device) {
    this.deviceDetailsForm.patchValue(this.patchForm(device));
  }

  watchFormControls(): void {
    this.deviceDetailsForm.valueChanges.subscribe(val => {
      this.deviceService.updateDevice(val);
    });
  }

  private getPrettyJSON(json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2);
  }

  get deviceConfig(): any {
    return this.deviceDetailsForm.get('deviceConfig').value;
  }

  get apiConfig(): any {
    return this.deviceDetailsForm.get('apiConfig').value;
  }

}
