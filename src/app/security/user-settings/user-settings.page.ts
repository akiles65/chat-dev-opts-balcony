import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from "../../shared/interfaces/IRegisterUser";
import { StorageService } from "../../shared/services/storage.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettings implements OnInit {
  username: any;
  avatar: string = '';
  gender: any = '';

  constructor(private storage: StorageService,
              private user: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  updateUser() {
    const data = this.loadingData();
    const id = this.storage.getUser().userId;
    this.user.updateUser(id, data).then(resp => {
    this.userUpdated(id);
    });
    this.username = '';
    this.gender = '';
  }

  userUpdated(id:string) {
    this.user.getUserById(id).then(resp => {
      const newUser = {
        userId: resp.id,
        ...resp.data()
      };
      this.user.setUser(newUser).then(() => {
        this.router.navigateByUrl('/users').then(() => {
          console.log('Login Success...');
        });
      })
    });
  }

  loadingData() {
    const data: IRegisterUser = {
      avatar: this.avatar,
      userIp: this.storage.getIp(),
      username: this.username,
      register: new Date()
    }
    return data;
  }

  newAvatar(value:string) {
    this.avatar = value;
  }
}
