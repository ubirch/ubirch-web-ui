import {Component, ViewChild} from '@angular/core';
import {DeviceStub} from '../../../models/device-stub';
import {DeviceService} from '../../../services/device.service';
import {interval, Subscription} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ModalController} from '@ionic/angular';
import {NewDevicePopupComponent} from './popups/new-device-popup/new-device-popup.component';
import {ConfirmDeleteDevicePopupComponent} from './popups/confirm-delete-device-popup/confirm-delete-device-popup.component';
import {CreatedDevicesListPopupComponent} from './popups/created-devices-list-popup/created-devices-list-popup.component';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {HeaderActionButton} from '../../../components/header/header-action-button';
import {DevicesListWrapper} from '../../../models/devices-list-wrapper';
import {LoaderService} from '../../../services/loader.service';
import {ToastService} from '../../../services/toast.service';
import {ToastType} from '../../../enums/toast-type.enum';
import {UbirchWebUIUtilsService} from '../../../utils/ubirch-web-uiutils.service';

@Component({
    selector: 'app-list',
    templateUrl: 'devices-list-page.component.html',
    styleUrls: ['devices-list-page.component.scss']
})
export class DevicesListPage {
    @ViewChild('HEADER') header: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public deviceStubs: Array<DeviceStub> = [];
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
    actionButtons = [new HeaderActionButton({
        color: 'success',
        labelKey: 'action-button.device.create',
        iconName: 'add-circle-outline',
        action: 'addDevice'
    })];
    public thingsListLoaded = false;
    public polling = new Subscription();
    private paginatorSubscr: Subscription;
    private devideStateSubscr: Subscription;
    private deleteDeviceSubscr: Subscription;
    private createDeviceSubscr: Subscription;

    constructor(
        private deviceService: DeviceService,
        private modalCtrl: ModalController,
        private toast: ToastService,
        private loading: LoaderService,
    ) {
    }

    get headerRightLabel(): string {
        return this.searchActive() ?
            'devices.list.label.count-filtered' :
            'devices.list.label.count-all';
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

    ionViewWillEnter() {
        this.restartPolling();
    }

    ionViewDidEnter() {
        this.paginatorSubscr = this.paginator.page
            .pipe(
                tap(() => this.restartPolling())
            )
            .subscribe();
        this.thingsListLoaded = true;

    }

    /**
     * search entry has changed
     * @param event: contains the search string; if empty search has to be deactivated and full list has to be loaded
     */
    search(event: any) {
        const searchStr = event.target.value;
        if (searchStr && searchStr.trim() !== '') {
            // erase list only if new search string is not just an extention of the last one
            if (!this.checkSearchIsJustRefinement(searchStr)) {
                this.resetList();
            }
            this.searchStr = searchStr;
        } else {
            // search inactive
            this.resetList();
            this.searchStr = undefined;
        }
        this.restartPolling();
    }

    /**
     * Load states of all things of list
     * @param listWrapper List of loaded things
     */
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
                            this.toast.openToast(ToastType.success, 'toast.device.deleted.success', 4000);
                        },
                        err => this.toast.openToast(ToastType.danger, 'toast.error.default', 10000, err.toString()));
            } else {
                this.toast.openToast(ToastType.light, 'toast.device.deleted.canceled', 4000);
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
                            this.presentDevicesCreatedModal(err, err.message);
                            this.toast.openToast(ToastType.danger, 'toast.device.creation.failed', 10000, err.message);
                        });
            } else {
                this.toast.openToast(ToastType.light, 'toast.device.creation.canceled', 4000);
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

    /**
     * cleanup: stop subscriptions
     */
    ionViewWillLeave(): void {
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

    /**
     * check if search is only changed by adding or removing letters at the beginning or end of searchstring
     * @param searchStr new search string; will be compared with stored search string
     */
    private checkSearchIsJustRefinement(searchStr: string): boolean {
        if (!this.searchStr || !searchStr) {
            return false;
        }
        return searchStr.includes(this.searchStr) || this.searchStr.includes(searchStr);
    }

    /**
     * erase things list and reset spinner flag (to be shown again during loading)
     */
    private resetList(): void {
        this.deviceStubs = [];
        this.thingsListLoaded = false;
    }

    private restartPolling() {

        this.stopPolling();

        this.polling = interval(environment.POLLING_INTERVAL_MILLISECONDS)
            .pipe(
                startWith(0),
                switchMap(() => {
                    if (!this.thingsListLoaded) {
                        this.loading.show();
                    }
                    // if search is active -> load filtered things
                    if (this.searchActive()) {
                        // TODO: paginate search result
                        return this.deviceService.searchDevices(
                            this.searchStr
                        );
                        // no search given -> load full list
                    } else {
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
                    this.thingsListLoaded = true;
                    this.loaded = true;
                    this.loadDeviceStates(wrapper);
                    this.header.setFocus();
                },
                error => {
                    this.loading.hide();
                    this.resetList();
                    this.loaded = true;
                    this.toast.openToast(ToastType.danger, 'toast.error.default', 10000, error.toString());
                }
            );
    }

    private stopPolling() {
        if (this.polling) {
            this.polling.unsubscribe();
        }
    }

    copyId(item: DeviceStub){
            UbirchWebUIUtilsService.copyToClipboard(item.hwDeviceId);
            this.toast.openToast(ToastType.light, 'deviceID.copy', 1000 )
    }

}
