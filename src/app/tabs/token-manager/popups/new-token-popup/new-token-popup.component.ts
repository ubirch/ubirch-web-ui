import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {CreateTokenFormData} from '../../../../models/create-token-form-data';
import {DeviceService} from '../../../../services/device.service';
import {LoggingService} from '../../../../services/logging.service';
import {TokenService} from '../../../../services/token.service';
import {UbirchWebUIUtilsService} from '../../../../utils/ubirch-web-uiutils.service';
import {targetIdentitiesValidator} from '../../../../validators/target-identities.validator';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-new-token-popup',
  templateUrl: './new-token-popup.component.html',
  styleUrls: ['./new-token-popup.component.scss'],
})
export class NewTokenPopupComponent implements OnInit, OnDestroy {

  @ViewChild('domains') domains: any;
  public devices;
  public availableScopes;
  public enteredDomains = [];
  public enteredGroups = [];
  public tokenDetailsForm: FormGroup;
  public selectTargetIdentities = true;

  private toggleSubscr: Subscription;
  private errorKeyPrefix = 'token.create.error.';

  constructor(
      private modalCtrl: ModalController,
      private deviceService: DeviceService,
      private fb: FormBuilder,
      private tokenService: TokenService,
      private logger: LoggingService,
      private utils: UbirchWebUIUtilsService,
      public modalController: ModalController,
      public userService: UserService,
      protected translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.getScopes();
    this.getDevices();
    this.tokenDetailsForm = this.fb.group({
      purpose: [ '', [ Validators.required, Validators.minLength(5) ]],
      expiration: [ '' ],
      validForAll: [false],
      notBefore: [ '' ],
      targetIdentities: [ '' ],
      targetGroups: [''],
      scopes: ['', Validators.required],
      originDomains: ['']
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
    if (details) {
      this.modalCtrl.dismiss(
          new CreateTokenFormData(details),
      );
    } else {
      this.logger.warn('Token creation called without form data - submit button should be inactive!');
    }
  }

  public get formErrors(): string[] {
    return this.tokenDetailsForm?.errors && this.tokenDetailsForm.touched ?
      Object.keys(this.tokenDetailsForm.errors).map(e => this.translate.instant(this.errorKeyPrefix + e))
      : null;
  }

  private getScopes() {
    this.tokenService.getAvailableScopes().subscribe(scopes => {
      this.availableScopes = scopes;
    });
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

  public appendDomain(domainP: string) {
    this.enteredDomains.push(domainP);
    this.tokenDetailsForm.patchValue({originDomains: this.enteredDomains});
    console.log(this.tokenDetailsForm.getRawValue());
    console.log(this.enteredDomains);
  }

  public removeDomain(domainP: string) {
    const index = this.enteredDomains.indexOf(domainP);
    this.enteredDomains.splice(index, 1);
    this.tokenDetailsForm.patchValue({originDomains: this.enteredDomains});
    console.log(this.tokenDetailsForm.getRawValue());
    console.log(this.enteredDomains);
  }

  public appendGroup(groupP: string) {
    this.enteredGroups.push(groupP);
    this.tokenDetailsForm.patchValue({targetGroups: this.enteredGroups});
    console.log(this.tokenDetailsForm.getRawValue());
    console.log(this.enteredGroups);
  }

  public removeGroup(groupP: string) {
    const index = this.enteredGroups.indexOf(groupP);
    this.enteredGroups.splice(index, 1);
    this.tokenDetailsForm.patchValue({targetGroups: this.enteredGroups});
    console.log(this.tokenDetailsForm.getRawValue());
    console.log(this.enteredGroups);
  }

  public ngOnDestroy(): void {
    this.utils.safeUnsubscribe(this.toggleSubscr);
  }

  public isAdmin(): boolean {
    let isAdmin = false;
    this.userService.getAccountInfo().subscribe(info => {
      isAdmin =  info.isAdmin;
    });
    return isAdmin;
  }

  public validURL(urlP): boolean {
    const regexp: RegExp = new RegExp('((https://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?)');
    if (regexp.test(urlP)) {
      return true;
    }
  }

  public validGroup(inputP): boolean {
      if (inputP) {
        return true;
      }
  }

  public targetGroupSelected() {
    const selectedGroup = this.tokenDetailsForm.getRawValue().targetGroups;
    if (selectedGroup[0]) {
      return true;
    }
  }

}
