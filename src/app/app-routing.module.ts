import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminOnlyGuard } from './auth/admin-only.guard';
import { AuthOnlyGuard } from './auth/auth-only.guard';
import { EnterOnDashboardGuard } from './auth/enter-on-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/home/home.module').then(m => m.HomePageModule),
//    canActivate: [ AccountProfileValidGuard, AuthOnlyGuard ]
    canActivate: [ AuthOnlyGuard ]
  },
  // {
  //   path: 'account-profile',
  //   loadChildren: () => import('./tabs/account-profile/account-profile.module').then(m => m.AccountProfilePageModule),
  //   canActivate: [ AuthOnlyGuard ]
  // },
  {
    path: 'devices',
    loadChildren: () => import('./tabs/devices/devices.module').then(m => m.ListPageModule),
//    canActivate: [ AccountProfileValidGuard, AuthOnlyGuard ]
    canActivate: [ AuthOnlyGuard ]
  },
  {
    path: 'token-manager',
    loadChildren: () => import('./tabs/token-manager/token-manager.module').then(m => m.TokenManagerPageModule),
    canActivate: [AccountProfileValidGuard, AuthOnlyGuard]
  },
  {
    path: 'verification',
    loadChildren: () => import('./tabs/verification/verification.module').then(m => m.VerificationPageModule),
  },
  {
    path: 'import',
    loadChildren: './tabs/import/import.module#ImportPageModule',
//    canActivate: [ AccountProfileValidGuard, AuthOnlyGuard, AuthOnlyGuard ]
    canActivate: [ AdminOnlyGuard, AuthOnlyGuard ],
  },
  {
    path: 'logout',
    canActivate: [ EnterOnDashboardGuard ],
    loadChildren: () => import('./tabs/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
