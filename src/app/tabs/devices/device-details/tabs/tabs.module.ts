import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { DeviceDataResolverService } from 'src/app/resolvers/device-data-resolver.service';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'data-graph',
        pathMatch: 'full',
      },
      {
        path: 'data-graph',
        loadChildren: () => import('./device-data-graph/device-data-graph.module').then(m => m.DeviceDataGraphPageModule),
        resolve: {
          device: DeviceDataResolverService
        }
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
        path: 'upphashes',
        loadChildren: () => import('./device-last-hashes/device-last-hashes.module').then(m => m.DeviceLastHashesPageModule)
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
        RouterModule.forChild(routes),
        TranslateModule
    ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
