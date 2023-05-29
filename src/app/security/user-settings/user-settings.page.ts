import { Component, OnInit } from '@angular/core';
import { IRegister, IUpdateUser, IUserLogin } from '../../shared/interfaces/IRegisterUser';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettings implements OnInit {

  user:IUpdateUser = {
    avatar: 'absent.png',
    userIp: '',
    name: '',
    dateUpdate: new Date()
  }
  myUser:IUserLogin;
  userUpdate = false;

  constructor(private storageService: StorageService,
              private userService: UserService) { }

  async ngOnInit() {
    this.user.userIp = await this.storageService.getIpStorage();
    this.myUser = await this.storageService.getUserStorage();
  }

  updateUser() {
    const id = this.myUser.userId;
    if (id) {
      this.userService.updateUser(id, this.user).then(() => {
        this.userUpdated(id);
      });
    }
  }

  userUpdated(id:string) {
    this.userService.getUserById(id).then(resp => {
      const userUpdate = {
        userId: resp.id,
        ...resp.data() as IRegister
      };
      this.storageService.setUserStorage(userUpdate).then(() => {
        this.userUpdate = true;
        this.reset();
      });
    });
  }

  reset() {
    this.user = {
      avatar: 'absent.png',
      userIp: '',
      name: '',
      dateUpdate: new Date()
    };
  }

  newAvatar(value:string) {
    this.user.avatar = value;
  }
}
