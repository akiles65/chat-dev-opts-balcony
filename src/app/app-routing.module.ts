import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserLoginGuard } from "./shared/guards/user-login.guard";
import { RegisterGuard } from "./shared/guards/register.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [UserLoginGuard]
  },
  {
    path: 'conversations',
    loadChildren: () => import('./pages/conversations/conversations.module').then(m => m.ConversationsPageModule),
    canActivate: [UserLoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./security/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./security/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [RegisterGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./security/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [UserLoginGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule),
    canActivate: [UserLoginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
