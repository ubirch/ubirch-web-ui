import {Component, ViewChild} from '@angular/core';
import {DeviceStub} from '../../../models/device-stub';
import {DeviceService} from '../../../services/device.service';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ModalController, ToastController} from '@ionic/angular';
import {NewDevicePopupComponent} from './popups/new-device-popup/new-device-popup.component';
import {ConfirmDeleteDevicePopupComponent} from './popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {CreatedDevicesListPopupComponent} from './popups/created-devices-list-popup/created-devices-list-popup.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HeaderActionButton} from '../../../components/header/header-action-button';

@Component({
  selector: 'app-list',
  templateUrl: 'devices-list-page.component.html',
  styleUrls: ['devices-list-page.component.scss']
})
export class DevicesListPage {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public deviceStubs: Array<DeviceStub> = [];

  polling = new Subscription();

  // pagination params
  totalItems = 0;
  pageSize = environment.LIST_ITEMS_PER_PAGE;
  ionite: string;

  constructor(
      private deviceService: DeviceService,
      private modalController: ModalController,
      private toastCtrl: ToastController
  ) {}

  toastrContent: Map<string, any> = new Map([
    ['del', {
      message: 'Device deleted',
      duration: 4000,
      color: 'success'
    }],
      ['cancl_del', {
      message: 'Deleting Device canceled',
      duration: 4000,
      color: 'light'
    }],
    ['cancl_create', {
      message: 'Device creation canceled',
      duration: 4000,
      color: 'warning'
    }],
    ['err', {
      message: 'Error occurred',
      duration: 4000,
      color: 'danger'
    }]
  ]);

  actionButtons = [new HeaderActionButton({
    color: 'success',
    label: 'Add New Device',
    iconName: 'add-circle-outline',
    action: 'addDevice'
  })];
  totalDevices = 42;

  handleButtonClick(action: string) {
    switch (action) {
      case 'addDevice':
        this.presentNewDeviceModal();
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

  ionViewWillEnter() {
    this.restartPolling();
  }

  ionViewDidEnter() {
    this.paginator.page
        .pipe(
            tap(() => this.restartPolling())
        )
        .subscribe();

  }

  ionViewWillLeave() {
    this.stopPolling();
  }

  private restartPolling() {
      this.stopPolling();

      this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
          .pipe(
              startWith(0),
              switchMap(() => this.deviceService.reloadDeviceStubs(
                  this.paginator.pageIndex,
                  this.pageSize
              ))
          )
          .subscribe(
              wrapper => {
                this.totalItems = wrapper.totalDevicesSize || 0;
                this.deviceStubs = wrapper.devices || [];
              }
          );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

  async confirmDeviceDelete(device: DeviceStub) {
    const modal = await this.modalController.create({
      component: ConfirmDeleteDevicePopupComponent
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail !== null && detail.data && detail.data.confirmed) {
        this.deviceService.deleteDevice(
            device.hwDeviceId)
            .subscribe(
                _ => {
                  this.restartPolling();
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

  async presentNewDeviceModal() {
    const modal = await this.modalController.create({
        component: NewDevicePopupComponent
    });
    modal.onDidDismiss().then((details: any) => {
      if (details && details.data) {
        this.deviceService.createDevicesFromData(
            details.data)
            .subscribe(
                createdDevice => {
                  this.restartPolling();
                  this.presentDevicesCreatedModal(createdDevice);
                },
                err => {
                  this.restartPolling();
                  const errMsg = 'something went wrong during devices creation: ' + err.message;
                  this.presentDevicesCreatedModal(err, errMsg);
                  this.finished(
                      'err',
                      ': ' + errMsg );
                });
      } else {
        this.finished('cancl_create');
      }
    });
    await modal.present();
  }

  async presentDevicesCreatedModal(createdDevice: Map<string, string>, errMeg?: string) {
    const modal = await this.modalController.create({
      component: CreatedDevicesListPopupComponent,
      componentProps: {
        deviceCreateStates: createdDevice,
        errorMessage: errMeg
      }
    });
    await modal.present();
  }
}
