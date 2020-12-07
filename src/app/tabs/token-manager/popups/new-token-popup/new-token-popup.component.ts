import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DeviceService} from '../../../../services/device.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'app-new-token-popup',
    templateUrl: './new-token-popup.component.html',
    styleUrls: ['./new-token-popup.component.scss'],
})
export class NewTokenPopupComponent implements OnInit {

    constructor(public modalCtrl: ModalController, private deviceService: DeviceService, private  fb: FormBuilder) {
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
