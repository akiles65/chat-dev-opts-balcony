import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DEV_OPTS } from "../constants/constants";


@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getIp() {
    return this.http.get("https://ipapi.co/json").subscribe((resp: any) => {
      this.setIp(resp.ip);
    });
  }

  setIp(ip: string) {
    localStorage.setItem(DEV_OPTS.USER_IP, ip);
  }
}
