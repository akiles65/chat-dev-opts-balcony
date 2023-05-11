import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSettings } from './user-settings.page';

const routes: Routes = [
  {
    path: '',
    component: UserSettings
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
