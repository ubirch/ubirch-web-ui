import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateTokenFormData } from '../../../../models/create-token-form-data';
import { DeviceService } from '../../../../services/device.service';
import { LoggingService } from '../../../../services/logging.service';
import { TokenService } from '../../../../services/token.service';

@Component({
    selector: 'app-new-token-popup',
    templateUrl: './new-token-popup.component.html',
    styleUrls: ['./new-token-popup.component.scss'],
})
export class NewTokenPopupComponent implements OnInit {

    constructor(
      public modalCtrl: ModalController,
      private deviceService: DeviceService,
      private fb: FormBuilder,
      private tokenService: TokenService,
      private logger: LoggingService
    ) {
    }

    public devices;
    public selectedThings;
    public tokenDetailsForm: FormGroup;

    ngOnInit() {
        this.getDevices();
        this.tokenDetailsForm = this.fb.group({
            purpose: ['', Validators.required],
            scope: ['', Validators.required],
            expiration: [''],
            notBefore: [''],
            targetIdentities: ['', Validators.required],
        });
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        console.log(this.selectedThings);
        console.log(this.tokenDetailsForm.value);
        this.modalCtrl.dismiss();
    }

    createToken() {
      const details = this.tokenDetailsForm.getRawValue();

      if (details) {
        this.modalCtrl.dismiss(
          new CreateTokenFormData(details)
        );
      } else {
        this.logger.warn('Token creation called without form data - submit button should be inactive!');
      }
    }

    getDevices() {
        this.deviceService.reloadDeviceStubs(
            0,
            1000
        ).subscribe(
            wrapper => {
                this.devices = wrapper.devices || [];
                console.log(this.devices);
            },
            error => {
            }
        );
    }

}
