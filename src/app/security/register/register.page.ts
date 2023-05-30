import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CookiesService } from '../../shared/services/cookies.service';
import { IRegister } from '../../shared/interfaces/IRegisterUser';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  password = {
    pass1: '',
    pass2: ''
  }

  newUser:IRegister = {
    avatar: 'absent.png',
    name: '',
    password: '',
    register: new Date(),
    userIp: '',
    username: '',
  }

  invalidPassword = false;
  invalidUser = false;

  constructor(private authService: AuthService,
              private cookieService: CookiesService,
              private router: Router,
              private storageService: StorageService,
              private userService: UserService) { }

  async ngOnInit() {
    this.newUser.userIp = await this.storageService.getIpStorage();
  }

  postUser() {
    this.invalidUser = false;
    this.invalidPassword = false;
    const validPassword = this.validatePassword(this.password.pass1, this.password.pass2);

    if (validPassword && this.newUser.username) {
      this.authService.usernameValidate(this.newUser.username).then((resp:any) => {
        if (resp.docs.length === 0) {
          this.userService.registerUser(this.newUser).then(() => {
            this.userService.getUserByIp(this.newUser.userIp).then(resp => {
              resp.docs.map((doc:any) => {
                const userLogin = {
                  userId: doc.id,
                  ...doc.data() as IRegister
                }
                this.cookieService.setCookies().then(() => {
                  this.storageService.setUserStorage(userLogin).then(() => {
                    this.router.navigateByUrl('/conversations');
                  });
                });
              });
            });
            this.reset();
          });
        } else {
          this.invalidUser = true;
        }
      })
    } else {
      this.invalidPassword = true;
    }
  }

  validatePassword(pass1:string, pass2:string) {
    if (pass1 === pass2) {
      this.newUser.password = pass1;
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.password = {
      pass1: '',
      pass2: ''
    }

    this.invalidPassword = false;

    this.newUser = {
      avatar: 'absent.png',
      name: '',
      password: '',
      register: new Date(),
      userIp: '',
      username: '',
    }
  }

  addAvatar(value: string) {
    this.newUser.avatar = value;
  }
}
