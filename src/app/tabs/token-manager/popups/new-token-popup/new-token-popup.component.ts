import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
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
  public userCanCreateRiskyTokens = false;
  public roles: string[] = [];
  public enteredDomains = [];
  public enteredGroups = [];
  public tokenDetailsForm: UntypedFormGroup;
  public selectTargetIdentities = true;
  public language;
  public now = new Date();
  public mindate = this.now.toISOString();
  public maxdate = new Date("2100").toISOString();

  private toggleSubscr: Subscription;
  private errorKeyPrefix = 'token.create.error.';

  constructor(
      private modalCtrl: ModalController,
      private deviceService: DeviceService,
      private fb: UntypedFormBuilder,
      private tokenService: TokenService,
      private logger: LoggingService,
      private utils: UbirchWebUIUtilsService,
      public modalController: ModalController,
      public userService: UserService,
      protected translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.language = this.translate.currentLang;
    this.getScopes();
    this.getDevices();
    this.getRoles();
    this.tokenDetailsForm = this.fb.group({
      purpose: [ '', [ Validators.required, Validators.minLength(6) ]],
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

  private getRoles() {
    this.userService.getAccountInfo().toPromise().then(info => {
      this.roles = info? info.roles : [];
      this.userCanCreateRiskyTokens = this.userHasRole('console_risky_tokens_write');
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

  public validURL(urlP): boolean {
    const regexp: RegExp = new RegExp('((http[s]?://)([\\da-z.-]+)((\\.([a-z.]{2,6})[/\\w .-]*)|:([0-9.]{3,6})[/\\w .-]*)/?)');
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

  public userHasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
