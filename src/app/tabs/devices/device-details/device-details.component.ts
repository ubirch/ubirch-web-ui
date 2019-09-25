import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import {HeaderActionButton} from '../../../components/header/header-action-button';
import {ConfirmDeleteDevicePopupComponent} from '../devices-list-page/popups/confirm-delete-device-popup/confirm-delete-device-popup.component';

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

  toastrContent: Map<string, any> = new Map([
        ['del', {
            message: 'Thing deleted',
            duration: 4000,
            color: 'success'
        }],
        ['cancl_del', {
            message: 'Deleting Things canceled',
            duration: 4000,
            color: 'light'
        }],
        ['save', {
            message: '<ion-icon src="assets/app-icons/information.svg"></ion-icon>    Changes on Thing saved',
            duration: 4000,
            color: 'success'
        }],
        ['cancl_save', {
            message: 'Changes on Details of Thing discarded',
            duration: 4000,
            color: 'light'
        }],
        ['err', {
            message: 'Error occurred',
            duration: 4000,
            color: 'danger'
        }]
    ]);

    constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private deviceService: DeviceService,
      public toastCtrl: ToastController,
      public router: Router,
      private modalCtrl: ModalController
  ) { }

  actionButtons = [new HeaderActionButton({
    color: 'dark',
    label: 'Back to Things List',
    iconPath: 'assets/app-icons/back-button.svg',
    action: 'back2DevicesList'
  })];

  handleButtonClick(action: string) {
    switch (action) {
      case 'back2DevicesList':
        this.navigate2DevicesList();
        break;
    }
  }

  async finished(param: string, details?: string) {
      const content = this.toastrContent.get(param);
      if (details && content && content.message) {
          content.message = content.message + ': ' + details;
      }
      const toast = await this.toastCtrl.create(content);
      toast.present();
  }


  navigate2DevicesList() {
      this.router.navigate(['devices']);
  }

  ngOnInit() {
    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: [''],
      description: [''],
      apiConfig: ['']
    });
    this.patchForm();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
        this.reloadDevice(this.id);
    } else {
      // handle url missmatch!!!!
        this.finished('err', 'things details url called without ID');
        this.router.navigate(['devices']);
    }
  }

  reloadDevice(id: string) {
      this.deviceService.loadDevice(this.id)
          .subscribe(
              loadedDevice =>  {
                  this.loadedDevice = loadedDevice;
                  if (this.loadedDevice) {
                      this.deviceDetailsForm.patchValue(this.patchForm(this.loadedDevice));
                      this.deviceHasUnsavedChanges = false;
                      this.watchFormControls();
                  }
              }
          );
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
              this.finished('save');
              this.deviceHasUnsavedChanges = false;
          }
      );
  }

  async confirmDeviceDelete() {
      const modal = await this.modalCtrl.create({
          component: ConfirmDeleteDevicePopupComponent,
          componentProps: {
              devices: [this.loadedDevice]
          }
      });
      modal.onDidDismiss().then((detail: any) => {
          if (detail !== null && detail.data && detail.data.confirmed) {
              this.deviceService.deleteDevice(
                  this.loadedDevice.hwDeviceId)
                  .subscribe(
                      _ => {
                          this.navigate2DevicesList();
                          this.finished('del');
                      },
                      err => this.finished(
                          'err',
                          err.toString()));
          } else {
              this.finished('cancl_del');
          }
      });
      await modal.present();
  }

  discardChanges() {
      this.finished('cancl_save');
      if (this.id) {
          this.reloadDevice(this.id);
      }
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
