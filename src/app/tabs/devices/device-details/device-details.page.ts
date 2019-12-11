import { Component, OnInit } from '@angular/core';
import {Device} from '../../../models/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../../services/device.service';
import {ToastController} from '@ionic/angular';
import {HeaderActionButton} from '../../../components/header/header-action-button';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {

   id: string;
   private deviceHasUnsavedChanges = false;
   loadedDevice: Device;

  toastrContent: Map<string, any> = new Map([
    ['err', {
      message: 'Error occurred',
      duration: 4000,
      color: 'danger'
    }]
  ]);

   constructor(
       private route: ActivatedRoute,
       private deviceService: DeviceService,
       public toastCtrl: ToastController,
       public router: Router,
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
    console.log(content.message);
    this.router.navigate(['devices']);

  }


  navigate2DevicesList() {
    this.router.navigate(['devices']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.reloadDevice(this.id);
    } else {
      // handle url missmatch!!!!
      this.finished('err', 'things details url called without ID');
    }
  }

  reloadDevice(id: string) {
    this.deviceService.loadDevice(this.id)
        .subscribe(
            loadedDevice =>  {
              this.loadedDevice = loadedDevice;
              if (this.loadedDevice) {
                this.deviceHasUnsavedChanges = false;
              }
            },
          error1 => {
              this.finished('err', 'loading thing\'s details failed - something is wrong with that device!!!');
          }
        );
  }

  get title(): string {
    return this.loadedDevice ? this.loadedDevice.description : '';
  }
}
