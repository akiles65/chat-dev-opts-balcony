import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSettingsRoutingModule } from './user-settings-routing.module';

import { UserSettings } from './user-settings.page';
import { AvatarsPageModule } from "../../shared/components/avatars/avatars.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserSettingsRoutingModule,
        AvatarsPageModule
    ],
  declarations: [UserSettings]
})
export class UserSettingsModule {}
