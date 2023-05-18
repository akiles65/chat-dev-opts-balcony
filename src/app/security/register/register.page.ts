import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { IRegisterUser } from "../../shared/interfaces/IRegisterUser";
import { IpService } from "../../shared/services/ip.service";
import { Router } from "@angular/router";
import { StorageService } from "../../shared/services/storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: any;
  avatar: string = '';

  constructor(private ip: IpService,
              private storage: StorageService,
              private user: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  postUser() {
    const data = this.loadingData();
    const ip = this.storage.getIp();
    this.user.registerUser(data).then(resp => {
      this.user.getUserByIp(ip).then(resp => {
        resp.docs.map((doc:any) => {
          const userLogin = {
            userId:doc.id,
            ...doc.data() as IRegisterUser
          }
          this.user.setUser(userLogin).then(() => {
            this.router.navigateByUrl('/conversations').then(() => {
              console.log('Login Success...');
            });
          })
        });
      })
    });
    this.username = '';
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

  addAvatar(value: string) {
    this.avatar = value;
  }
}
