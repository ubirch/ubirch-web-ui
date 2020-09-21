import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DeviceService} from '../../../../../services/device.service';
import {ModalController} from '@ionic/angular';
// tslint:disable-next-line:max-line-length
import {ConfirmDeleteDevicePopupComponent} from '../../../devices-list-page/popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {BEDevice} from '../../../../../models/bedevice';
import {Observable, Subscription, throwError} from 'rxjs';
import {ToastService} from '../../../../../services/toast.service';
import {ToastType} from '../../../../../enums/toast-type.enum';

@Component({
  selector: 'app-device-settings',
  templateUrl: './device-settings.page.html',
  styleUrls: ['./device-settings.page.scss'],
})
export class DeviceSettingsPage implements OnInit, OnDestroy {

  deviceDetailsForm: FormGroup;
  deviceAttributesForm: FormGroup;
  loadedDevice: BEDevice;

  private deviceHasUnsavedChanges = false;
  private deviceSubsc: Subscription;
  private valueChangesSubscr: Subscription;
  private updateDeviceSubscr: Subscription;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    public toast: ToastService,
    public router: Router,
    private modalCtrl: ModalController
  ) {
  }

  navigate2DevicesList() {
    this.router.navigate(['devices']);
  }

  ngOnInit() {
    this.deviceAttributesForm = this.fb.group({
      apiConfig: [['']],
      claiming_tags: [[]],
    });
    this.deviceDetailsForm = this.fb.group({
      hwDeviceId: [''],
      description: [''],
      attributes: this.deviceAttributesForm,
    });
    this.patchForm();

    this.deviceSubsc = this.deviceService.observableCurrentDevice
      .subscribe(
        loadedDevice => {
          this.loadedDevice = loadedDevice;
          if (this.loadedDevice) {
            this.deviceDetailsForm.patchValue(this.patchForm(this.loadedDevice));
            this.deviceHasUnsavedChanges = false;
            this.watchFormControls();
          }
        }
      );
  }

  ngOnDestroy(): void {
    if (this.deviceSubsc) {
      this.deviceSubsc.unsubscribe();
    }
    if (this.valueChangesSubscr) {
      this.valueChangesSubscr.unsubscribe();
    }
    if (this.updateDeviceSubscr) {
      this.updateDeviceSubscr.unsubscribe();
    }
  }

  watchFormControls(): void {
    this.valueChangesSubscr = this.deviceDetailsForm.valueChanges.subscribe(val => {
      this.deviceHasUnsavedChanges = true;
    });
  }

  async saveDevice() {
    const details = this.deviceDetailsForm.getRawValue();

    this.updateDeviceSubscr = this.updateDeviceFromData(details).subscribe(
      updatedDevice => {
        this.loadedDevice = new BEDevice(updatedDevice);
        this.patchForm(this.loadedDevice);
        this.toast.openToast(ToastType.success,
          'toast.device.settings.update.success',
          4000,
          undefined,
          undefined,
          'assets/app-icons/information.svg'
        );
        this.deviceHasUnsavedChanges = false;
      },
      (err: Error) => {
        switch (err.message) {
          case 'update-without-data':
            this.toast.openToast(
              ToastType.danger, 'toast.device.settings.update.failed.no-data', 10000);
            break;
          default:
            this.toast.openToast(
              ToastType.danger, 'toast.device.settings.update.failed', 10000, err.toString());
        }
      }
    );
  }

  /**
   * if device already loaded, the current loaded device is patched with form data;
   * if no item
   * @param data form data, containing several device properties
   */
  public updateDeviceFromData(data: FormGroup): Observable<BEDevice> {
    if (data) {
      const device = this.loadedDevice.patch(data);
      if (device && device.hwDeviceId) {
        return this.deviceService.updateDevice(device);
      }
    }
    throwError(new Error('update-without-data'));
  }

  public thingCanBeDeleted(): boolean {
    try {
      return this.loadedDevice.canBeDeleted ? true : false;
    } catch (e) {
      return false;
    }
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
              this.toast.openToast(ToastType.success, 'toast.device.deleted.success', 4000);
            },
            err => this.toast.openToast(ToastType.danger, 'toast.error.default', 10000, err.toString()));
      } else {
        this.toast.openToast(ToastType.light, 'toast.device.deleted.canceled', 4000);
      }
    });
    await modal.present();
  }

  discardChanges() {
    this.toast.openToast(ToastType.light, 'toast.device.settings.update.canceled', 4000);
    this.deviceDetailsForm.patchValue(this.patchForm(this.loadedDevice));
  }

  private patchForm(device?: BEDevice): any {
    const val = {
      hwDeviceId: device && device.hwDeviceId ? device.hwDeviceId : '',
      description: device && device.description ? device.description : '',
      attributes: {
        claiming_tags: device && device.attributes && device.attributes.claiming_tags ?
          device.attributes.claiming_tags : [],
        apiConfig: device && device.attributes && device.attributes.apiConfig && device.attributes.apiConfig.length > 0 ?
          [this.getPrettyJSON(device.attributes.apiConfig[0])] : []
      }
    };
    return val;
  }

  private getPrettyJSON(json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2);
  }
}
