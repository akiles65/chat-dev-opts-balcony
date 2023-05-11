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
  gender: any;

  constructor(private ip: IpService,
              private storage: StorageService,
              private user: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  postUser() {
    let data = this.loadingData();
    let ip = this.storage.getIp();
    this.user.userRegister(data).then(resp => {
      this.user.getUserByIp(ip).then(resp => {
        resp.docs.map((doc:any) => {
          const userLogin = {
            userId:doc.id,
            ...doc.data() as IRegisterUser
          }
          this.user.setUser(userLogin).then(() => {
            this.router.navigateByUrl('/users').then(() => {
              console.log('Login Success...');
            });
          })
        });
      })
    });
    this.username = '';
    this.gender = '';
  }

  loadingData() {
    const data: IRegisterUser = {
      gender: this.gender,
      userIp: this.storage.getIp(),
      username: this.username,
      register: new Date()
    }
    return data;
  }

}
