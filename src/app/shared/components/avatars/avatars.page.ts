import { ViewChild, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { IAvatar } from "../../interfaces/IRegisterUser";
import { avatars } from "../../data/data";

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.page.html',
  styleUrls: ['./avatars.page.scss'],
})
export class AvatarsPage implements OnInit {

  @Output () avatarResponse: EventEmitter<string> = new EventEmitter();
  @ViewChild(IonModal) modal: IonModal;
  avatars: IAvatar[] = avatars

  constructor() { }

  ngOnInit() {
  }

  selectedAvatar(value:string) {
    this.modal.dismiss(value, 'confirm').then(() => {
      this.avatarResponse.emit(value);
    });
  }
}
