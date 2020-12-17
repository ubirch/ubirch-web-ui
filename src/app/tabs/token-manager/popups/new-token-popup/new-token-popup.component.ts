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
  styleUrls: [ './new-token-popup.component.scss' ],
})
export class NewTokenPopupComponent implements OnInit {

  public devices;
  public selectedThings;
  public tokenDetailsForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private logger: LoggingService,
  ) {
  }

  public ngOnInit(): void {
    this.getDevices();
    this.tokenDetailsForm = this.fb.group({
      purpose: [ '', [ Validators.required, Validators.minLength(5) ]],
      expiration: [ '' ],
      notBefore: [ '' ],
      targetIdentities: [ '', Validators.required ],
    });
  }

  public dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  public createToken(): void {
    const details = this.tokenDetailsForm.getRawValue();

    if (details) {
      this.modalCtrl.dismiss(
        new CreateTokenFormData(details),
      );
    } else {
      this.logger.warn('Token creation called without form data - submit button should be inactive!');
    }
  }

  private getDevices(): void {
    this.deviceService.reloadDeviceStubs(
      0,
      1000,
    ).subscribe(
      wrapper => {
        this.devices = wrapper.devices || [];
        console.log(this.devices);
      },
      error => {
        // TODO: handle error
      },
    );
  }

}
