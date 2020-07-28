import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { DeviceDataResolverService } from 'src/app/resolvers/device-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'data',
        pathMatch: 'full',
      },
      {
        path: 'data',
        loadChildren: () => import('./device-data/device-data.module').then(m => m.DeviceDataPageModule),
        resolve: {
          device: DeviceDataResolverService
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./device-settings/device-settings.module').then(m => m.DeviceSettingsPageModule)
      },
      {
        path: 'state',
        loadChildren: () => import('./device-state/device-state.module').then(m => m.DeviceStatePageModule)
      },
      {
        path: 'upps',
        loadChildren: () => import('./device-last-upp/device-last-upp.module').then(m => m.DeviceLastUPPPageModule)
      },
      {
        path: 'pubkeys',
        loadChildren: () => import('./device-pubkeys/device-pubkeys.module').then(m => m.DevicePubkeysPageModule)
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
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
