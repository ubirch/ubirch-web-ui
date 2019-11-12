import {Component, ViewChild} from '@angular/core';
import {DeviceStub} from '../../../models/device-stub';
import {DeviceService} from '../../../services/device.service';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {NewDevicePopupComponent} from './popups/new-device-popup/new-device-popup.component';
import {ConfirmDeleteDevicePopupComponent} from './popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {CreatedDevicesListPopupComponent} from './popups/created-devices-list-popup/created-devices-list-popup.component';
import {MatPaginator} from '@angular/material/paginator';
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
  numberOfDevices = 0;
  pageSize = environment.LIST_ITEMS_PER_PAGE;
  /**
   * If searchStr is set, the search is activated and pagination deactivated!!
   */
  searchStr: string;
  numOfFilteredItems = 0;

  loadingSpinner: Promise<void | HTMLIonLoadingElement>;
  loaded = false;

  constructor(
      private deviceService: DeviceService,
      private modalCtrl: ModalController,
      private toastCtrl: ToastController,
      private loadingController: LoadingController
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
    this.restartPolling(true);
  }

  ionViewDidEnter() {
    this.paginator.page
        .pipe(
            tap(() => this.restartPolling(true))
        )
        .subscribe();

  }

  ionViewWillLeave() {
    this.stopPolling();
  }

  private restartPolling(showSpinner?: boolean) {
      this.stopPolling();
      if (showSpinner) {
        this.loaded = false;
      }

      this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
          .pipe(
              startWith(0),
              switchMap(() => {
                if (this.searchActive()) {
                  return this.deviceService.searchDevices(
                      this.searchStr
                  );
                } else {
                  if (!this.loaded) {
                    this.showLoader();
                  }
                  return this.deviceService.reloadDeviceStubs(
                      this.paginator ? this.paginator.pageIndex : 0,
                      this.pageSize
                  );
                }
              })
          )
          .subscribe(
              wrapper => {
                this.numberOfDevices = wrapper.numberOfDevices || 0;
                this.numOfFilteredItems = wrapper.filteredDevicesSize || 0;
                this.deviceStubs = wrapper.devices || [];
                this.loaded = true;
                this.hideLoader();
              }
          );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

  search(event: any) {
    const searchStr = event.target.value;
    if (searchStr && searchStr.trim() !== '') {
      this.searchStr = searchStr;
    } else {
      this.searchStr = undefined;
    }
    this.restartPolling();
  }

  async confirmDeviceDelete(device: DeviceStub) {
    const modal = await this.modalCtrl.create({
      component: ConfirmDeleteDevicePopupComponent,
      componentProps: {
        devices: [device]
      }
    });
    modal.onDidDismiss().then((detail: any) => {
      if (detail !== null && detail.data && detail.data.confirmed) {
        this.deviceService.deleteDevice(
            device.hwDeviceId)
            .subscribe(
                _ => {
                  this.restartPolling(true);
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
    const modal = await this.modalCtrl.create({
        component: NewDevicePopupComponent
    });
    modal.onDidDismiss().then((details: any) => {
      if (details && details.data) {
        this.deviceService.createDevicesFromData(
            details.data)
            .subscribe(
                createdDevice => {
                  this.restartPolling(true);
                  this.presentDevicesCreatedModal(createdDevice);
                },
                err => {
                  this.restartPolling(true);
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
    const modal = await this.modalCtrl.create({
      component: CreatedDevicesListPopupComponent,
      componentProps: {
        deviceCreateStates: createdDevice,
        errorMessage: errMeg
      }
    });
    await modal.present();
  }

  searchActive(): boolean {
    return this.searchStr && this.searchStr.trim().length > 0;
  }

  get headerRightLabel(): string {
    return this.searchActive() ? 'Filtered Things: ' : 'Total Things:';
  }

  get headerRightValue(): number {
    return this.searchActive() ? this.numOfFilteredItems : this.numberOfDevices;
  }

  showLoader() {
    this.loadingSpinner = this.loadingController.create({
      message: 'Loading your Things'
    }).then((res) => {
      res.present();
    });
  }

  hideLoader() {
    if (this.loadingSpinner) {
      this.loadingController.dismiss();
      this.loadingSpinner = undefined;
    }
  }
}
