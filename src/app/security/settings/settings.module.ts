import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsRoutingModule } from './settings-routing.module';

import { UserSettings } from './settings.page';
import { AvatarsPageModule } from "../../shared/components/avatars/avatars.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingsRoutingModule,
        AvatarsPageModule
    ],
  declarations: [UserSettings]
})
export class SettingsModule {}
