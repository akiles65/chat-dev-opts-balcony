import { Component, OnInit } from '@angular/core';
import { IpService } from '../../shared/services/ip.service';
import { IRegisterUser } from '../../shared/interfaces/IRegisterUser';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin?: any;

  constructor(private ipService: IpService,
              private router: Router,
              private storage: StorageService,
              private userService: UserService) { }

  async ngOnInit() {
    this.storage.cleanStorage();
    await this.ipService.getIp();
  }

  login() {
    let ip = this.storage.getIp();
    if (ip) {
      this.userService.getUserByIp(ip).then((resp:any) => {
        if (resp.docs.length != 0) {
          resp.docs.map((doc:any) => {
            this.userLogin = {
              userId:doc.id,
              ...doc.data() as IRegisterUser
            }
            this.userService.setUser(this.userLogin).then(() => {
              this.router.navigateByUrl('/conversations').then(() => {
                console.log('Login Success...');
              });
            })
          });
        } else {
          this.router.navigateByUrl('/register').then(() => {
            console.log('Register Required...');
          });
        }
      });
    }
  }
}
