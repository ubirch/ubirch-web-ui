import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import { Subscription } from 'rxjs';
import {CreateTokenFormData} from '../../../../models/create-token-form-data';
import {DeviceService} from '../../../../services/device.service';
import {LoggingService} from '../../../../services/logging.service';
import {TokenService} from '../../../../services/token.service';
import { UbirchWebUIUtilsService } from '../../../../utils/ubirch-web-uiutils.service';
import { targetIdentitiesValidator } from '../../../../validators/target-identities.validator';

@Component({
  selector: 'app-new-token-popup',
  templateUrl: './new-token-popup.component.html',
  styleUrls: ['./new-token-popup.component.scss'],
})
export class NewTokenPopupComponent implements OnInit, OnDestroy {

  public devices;
  public tokenDetailsForm: FormGroup;
  public selectTargetIdentities = true;

  private toggleSubscr: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private logger: LoggingService,
    private utils: UbirchWebUIUtilsService
  ) {
  }

  public ngOnInit(): void {
    this.getDevices();
    this.tokenDetailsForm = this.fb.group({
      purpose: [ '', [ Validators.required, Validators.minLength(5) ]],
      expiration: [ '' ],
      notBefore: [ '' ],
      validForAll: [ false ],
      targetIdentities: [ '' ],
    }, {validator: targetIdentitiesValidator});

    this.toggleSubscr = this.tokenDetailsForm.get('validForAll').valueChanges.subscribe(val => {
      this.selectTargetIdentities = !val;
    });
  }

  public dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  public createToken(): void {
    const details = this.tokenDetailsForm.getRawValue();
    const currentDate = Date.now();
    const expirationMilliSeconds = new Date(details.expiration).getTime();
    const notBeforeMilliSeconds = new Date(details.notBefore).getTime();

    details.expiration = (expirationMilliSeconds - currentDate) / 1000;
    details.notBefore = (notBeforeMilliSeconds - currentDate) / 1000;

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
    ).toPromise().then(
      wrapper => {
        this.devices = wrapper.devices || [];
      }
    ).catch(error => {
        // TODO: handle error
      }
    );
  }

  public ngOnDestroy(): void {
    this.utils.safeUnsubscribe(this.toggleSubscr);
  }

}
