import { Injectable } from '@angular/core';
import { CapacitorCookies } from '@capacitor/core';
import { DEV_OPTS } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../interfaces/IRegisterUser';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage,
              private http: HttpClient) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  getIp() {
    return this.http.get("https://ipapi.co/json").subscribe((resp: any) => {
      this.setIpStorage(resp.ip);
    });
  }

  async setIpStorage(ip: string) {
    await this._storage?.set(DEV_OPTS.USER_IP, ip);
  }

  getIpStorage() {
    return this.storage?.get(DEV_OPTS.USER_IP);
  }

  async setUserStorage(userLogin:IUserLogin) {

    const user = {
      avatar: userLogin.avatar,
      name: userLogin.name,
      userId: userLogin.userId,
      userIp: userLogin.userIp,
      username: userLogin.username,
    }
    await this._storage?.set(DEV_OPTS.USER_LOGIN, user);
  }

  getUserStorage():Promise<IUserLogin> {
    return this.storage?.get(DEV_OPTS.USER_LOGIN);
  }

  cleanStorage() {
    this.storage?.remove(DEV_OPTS.USER_LOGIN);
    localStorage.clear();
  }

///////////// Cookies ///////////////////////////

  async setCookies() {
    await CapacitorCookies.setCookie({
      url: 'http://localhost:4200',
      key: 'USER_ACTIVE',
      expires: '7',
      value: 'true',
    });
  }

  getCookies() {
    return document.cookie;
  }

  async deleteCookies() {
    await CapacitorCookies.deleteCookie({
      url: 'http://localhost:4200',
      key: 'USER_ACTIVE',
    });
  }

  async clearCookiesOnUrl() {
    await CapacitorCookies.clearCookies({
      url: 'https://example.com',
    });
  }

  async clearAllCookies() {
    await CapacitorCookies.clearAllCookies();
  }
}
