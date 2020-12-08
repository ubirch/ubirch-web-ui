import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DeviceService} from '../../../../services/device.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from "../../../../services/token.service";


@Component({
    selector: 'app-new-token-popup',
    templateUrl: './new-token-popup.component.html',
    styleUrls: ['./new-token-popup.component.scss'],
})
export class NewTokenPopupComponent implements OnInit {

    constructor(public modalCtrl: ModalController, private deviceService: DeviceService, private  fb: FormBuilder, private tokenService: TokenService) {
    }

    public devices;
    public selectedThings;
    public tokenDetailsForm: FormGroup;

    ngOnInit() {
        this.getDevices();
        this.tokenDetailsForm = this.fb.group({
            description: ['', Validators.required],
            scope: ['', Validators.required],
            expiration: [''],
            vFrom: [''],
            vThings: ['', Validators.required],
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
        console.log(this.tokenDetailsForm.value);
        this.tokenService.postToken();
        this.modalCtrl.dismiss();
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
