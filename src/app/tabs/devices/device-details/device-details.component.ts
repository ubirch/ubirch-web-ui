import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {HeaderActionButton} from '../../../components/header/header-action-button';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent implements OnInit {

  deviceDetailsForm: FormGroup;
  id: string;
  private deviceHasUnsavedChanges = false;
  loadedDevice: Device;
  creationDate = 'September 6, 2019, 2:19 pm';

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private deviceService: DeviceService,
      public toastController: ToastController,
      public router: Router
  ) { }

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Back to DevicesList',
    iconPath: 'assets/app-icons/back-button.svg',
    action: 'back2DevicesList'
  })];

  handleButtonClick(action: string) {
    switch (action) {
      case 'back2DevicesList':
        this.router.navigate(['devices']);
        break;
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.deviceDetailsForm = this.fb.group({
        hwDeviceId: [''],
        description: [''],
        apiConfig: ['']
      });
      this.patchForm();

      this.deviceService.loadDevice(this.id)
        .subscribe(
            loadedDevice =>  {
              this.loadedDevice = new Device(loadedDevice);
              if (this.loadedDevice) {
                this.deviceDetailsForm.patchValue(this.patchForm(this.loadedDevice));
                this.deviceHasUnsavedChanges = false;
                this.watchFormControls();
              }
            }
        );
    } else {
      // TODO: handle url missmatch!!!!
    }
  }

  private patchForm(device?: Device): any {
    const val = {
      hwDeviceId: device && device.hwDeviceId ? device.hwDeviceId : '',
      description: device && device.description ? device.description : '',
      apiConfig: device && device.apiConfig && device.apiConfig.length > 0 ?
          this.getPrettyJSON(device.apiConfig) : undefined
    };
    return val;
  }

  watchFormControls(): void {
    this.deviceDetailsForm.valueChanges.subscribe(val => {
      this.deviceHasUnsavedChanges = true;
    });
  }

  saveDevice() {
    this.deviceService.updateDevice(this.loadedDevice.patchDevice(this.deviceDetailsForm.value)).subscribe(
          updatedDevice => {
              this.loadedDevice = new Device(updatedDevice);
              this.patchForm(this.loadedDevice);
              this.deviceHasUnsavedChanges = false;
          }
      );
  }

  deleteDevice() {
    console.log('DELETE DEVICE FROM DETAILS NOT YET IMPLEMENTED');
  }

  discardChanges() {
    console.log('Discard changes of device properties NOT YET IMPLEMENTED');
  }

  private getPrettyJSON(json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2);
  }

  get hwDeviceId(): any {
    return this.deviceDetailsForm.get('hwDeviceId').value;
  }

  get title(): string {
    return this.loadedDevice ? this.loadedDevice.description : '';
  }

}
