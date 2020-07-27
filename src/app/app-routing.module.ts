import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {EnterOnDashboardGuard} from './auth/enter-on-dashboard.guard';
import { AdminOnlyGuard } from './auth/admin-only.guard';
import { AuthOnlyGuard } from './auth/auth-only.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/home/home.module').then(m => m.HomePageModule),
    canActivate: [ AuthOnlyGuard ]
  },
  {
    path: 'devices',
    loadChildren: () => import('./tabs/devices/devices.module').then(m => m.ListPageModule),
    canActivate: [ AuthOnlyGuard ]
  },
  {
    path: 'verification',
    loadChildren: () => import('./tabs/verification/verification.module').then(m => m.VerificationPageModule),
  },
  {
    path: 'import',
    loadChildren: './tabs/import/import.module#ImportPageModule',
    canActivate: [ AdminOnlyGuard, AuthOnlyGuard ],
  },
  {
    path: 'logout',
    canActivate: [ EnterOnDashboardGuard ],
    loadChildren: () => import('./tabs/logout/logout.module').then(m => m.LogoutPageModule)
  },
  { path: 'device-data', loadChildren: './tabs/devices/device-details/tabs/device-data/device-data.module#DeviceDataPageModule' },
  { path: 'device-last-upp', loadChildren: './tabs/devices/device-details/tabs/device-last-upp/device-last-upp.module#DeviceLastUPPPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
