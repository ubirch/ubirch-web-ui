import { Component } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
  ) { }

  clientStartImgFileName = environment.client_startpage_image_filename || 'start_img.svg';
  clientStartImgPath = '/assets/images/' + this.clientStartImgFileName;

  clientDescriptionFileName = environment.client_description_filename || 'description.md';
  clientDescriptionPath = '/assets/md/' + this.clientDescriptionFileName;


  onLoad(event) {
    console.log('client description loaded');
  }

  onError(event) {
    console.log('Error loading client description');
  }
}
