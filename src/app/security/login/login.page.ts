import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CookiesService } from '../../shared/services/cookies.service';
import { ILogin, IRegister} from '../../shared/interfaces/IRegisterUser';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validUser = false;
  user: ILogin = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService,
              private cookieService: CookiesService) { }

  async ngOnInit() {
    this.storageService.cleanStorage();
    this.cookieService.deleteCookies();
    await this.storageService.getIp();
  }

  login() {
    this.validUser = false;
    this.authService.getUser(this.user).then((resp:any) => {
      if (resp.docs.length === 1) {
        resp.docs.map((doc:any) => {
          const userLogin = {
            userId:doc.id,
            ...doc.data() as IRegister
          }
          this.reset();
          this.cookieService.setCookies().then(() => {
            this.storageService.setUserStorage(userLogin).then(() => {
              this.router.navigateByUrl('/conversations');
            });
          });
        });
      } else {
        this.validUser = true;
      }
    });
  }

  reset() {
    this.user = {
      username: '',
      password: ''
    }
  }
}
