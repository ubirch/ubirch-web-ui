import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('./tabs/devices/devices.module').then(m => m.ListPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./tabs/verification/verification.module').then(m => m.VerificationPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./tabs/logout/logout.module').then(m => m.LogoutPageModule)
  },
  { path: 'device-pubkeys', loadChildren: './tabs/devices/device-details/tabs/device-pubkeys/device-pubkeys.module#DevicePubkeysPageModule' },
  { path: 'tabs', loadChildren: './tabs/devices/device-details/tabs/tabs.module#TabsPageModule' },
  { path: 'verification', loadChildren: './tabs/verification/verification.module#VerificationPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
