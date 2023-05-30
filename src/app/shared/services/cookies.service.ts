import { Injectable } from '@angular/core';
import { CapacitorCookies } from '@capacitor/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  async setCookies() {
    this.cookieService.set('USER_ACTIVE', 'Active', 7, '', 'localhost');
  }

  getCookies() {
    return this.cookieService.get('USER_ACTIVE');
  }

  deleteCookies() {
    this.cookieService.delete('USER_ACTIVE');
  }

  async clearAllCookies() {
    await CapacitorCookies.clearAllCookies();
  }
}
