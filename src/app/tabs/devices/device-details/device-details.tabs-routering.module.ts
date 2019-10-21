import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeviceDetailsPage} from './device-details.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: DeviceDetailsPage,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () => import('./tabs/device-settings/device-settings.module').then(m => m.DeviceSettingsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/settings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceDetailsTabsRoutingModule {}
