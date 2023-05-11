import { Injectable } from '@angular/core';
import { DEV_OPTS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  cleanStorage() {
    localStorage.clear();
  }

  getUser() {
    const user = localStorage.getItem(DEV_OPTS.USER_LOGIN);
    if (user) {
      return JSON.parse(user);
    }
  }

  getIp() {
    return localStorage.getItem(DEV_OPTS.USER_IP);
  }
}
