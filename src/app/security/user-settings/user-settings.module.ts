import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSettingsRoutingModule } from './user-settings-routing.module';

import { UserSettings } from './user-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSettingsRoutingModule
  ],
  declarations: [UserSettings]
})
export class UserSettingsModule {}
