import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeviceDetailsPage} from './device-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceDetailsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceDetailsTabsRoutingModule {}
