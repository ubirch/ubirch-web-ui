import {Component, OnDestroy, ViewChild} from '@angular/core';
import {DeviceStub} from '../../../models/device-stub';
import {DeviceService} from '../../../services/device.service';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ModalController, ToastController} from '@ionic/angular';
import {NewDevicePopupComponent} from './popups/new-device-popup/new-device-popup.component';
import {ConfirmDeleteDevicePopupComponent} from './popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {CreatedDevicesListPopupComponent} from './popups/created-devices-list-popup/created-devices-list-popup.component';
import {MatPaginator} from '@angular/material/paginator';
import {HeaderActionButton} from '../../../components/header/header-action-button';
import {DevicesListWrapper} from '../../../models/devices-list-wrapper';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: 'devices-list-page.component.html',
  styleUrls: ['devices-list-page.component.scss']
})
export class DevicesListPage implements OnDestroy {
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

  loaded = false;
  stateLoading = false;
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
      duration: 10000,
      color: 'danger'
    }]
  ]);
  actionButtons = [new HeaderActionButton({
    color: 'success',
    label: 'Add New Device',
    iconName: 'add-circle-outline',
    action: 'addDevice'
  })];
  private paginatorSubscr: Subscription;
  private devideStateSubscr: Subscription;
  private deleteDeviceSubscr: Subscription;
  private createDeviceSubscr: Subscription;

  constructor(
    private deviceService: DeviceService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loading: LoaderService
  ) {
  }

  get headerRightLabel(): string {
    return this.searchActive() ? 'Filtered Things: ' : 'Total Things:';
  }

  get headerRightValue(): number {
    return this.searchActive() ? this.numOfFilteredItems : this.numberOfDevices;
  }

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
    this.paginatorSubscr = this.paginator.page
      .pipe(
        tap(() => this.restartPolling())
      )
      .subscribe();

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

  async loadDeviceStates(listWrapper: DevicesListWrapper) {

    if (listWrapper && listWrapper.devices && listWrapper.devices.length > 0) {
      this.stateLoading = true;
      this.devideStateSubscr = this.deviceService.getDeviceStates(listWrapper.devices.map(device => device.hwDeviceId)).subscribe(
        states => {
          this.stateLoading = false;
          listWrapper.setDeviceStates(states);
          this.deviceStubs = listWrapper.devices || [];
        },
        _ => {
          this.stateLoading = false;
          this.deviceStubs = this.deviceStubs.map(
            stub => {
              stub.deviceState = undefined;
              return stub;
            });
        }
      );
    }
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
        this.deleteDeviceSubscr = this.deviceService.deleteDevice(
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
    const modal = await this.modalCtrl.create({
      component: NewDevicePopupComponent
    });
    modal.onDidDismiss().then((details: any) => {
      if (details && details.data) {
        this.createDeviceSubscr = this.deviceService.createDevicesFromData(
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
                ': ' + errMsg);
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

  public thingCanBeDeleted(device: DeviceStub): boolean {
    return device && device.canBeDeleted;
  }

  ngOnDestroy(): void {
    this.stopPolling();
    if (this.paginatorSubscr) {
      this.paginatorSubscr.unsubscribe();
    }
    if (this.devideStateSubscr) {
      this.devideStateSubscr.unsubscribe();
    }
    if (this.deleteDeviceSubscr) {
      this.deleteDeviceSubscr.unsubscribe();
    }
    if (this.createDeviceSubscr) {
      this.createDeviceSubscr.unsubscribe();
    }
  }

  private restartPolling() {

    this.stopPolling();

    this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
      .pipe(
        startWith(0),
        switchMap(() => {
          if (this.searchActive()) {
            this.loading.show();
            return this.deviceService.searchDevices(
              this.searchStr
            );
          } else {
            this.loading.show();
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
          this.loading.hide();
          this.loaded = true;
          this.loadDeviceStates(wrapper);
        },
        error => {
          this.loading.hide();
          this.loaded = true;
          this.finished(
            'err',
            error.toString());
        }
      );
  }

  private stopPolling() {
    if (this.polling) {
      this.polling.unsubscribe();
    }
  }

}
