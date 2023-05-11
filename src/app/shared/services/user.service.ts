import { Injectable } from '@angular/core';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { DEV_OPTS } from '../constants/constants';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp(environment.firebaseConfig);

const db = firebase.firestore();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async userRegister(post: IRegisterUser) {
    const query = db.collection(DEV_OPTS.USER_COLLECTION);
    await query.add(post);
  }

  getAllUsers(userId:any) {
    // const user = localStorage.getItem(DEV_OPTS.USER_LOGIN);
    // let ip = '';
    // if (user) {
    //   ip = JSON.parse(user).USER_IP;
    // }
    const query = db.collection(DEV_OPTS.USER_COLLECTION);
    return query.where(DEV_OPTS.USER_IP, '!=', userId).get();
  }

  getUserByIp(ip: any) {
    const query = db.collection(DEV_OPTS.USER_COLLECTION);
    return query.where(DEV_OPTS.USER_IP, '==', ip).get();
  }

  getUserById(id: any) {
    return db.collection(DEV_OPTS.USER_COLLECTION).doc(id).get();
  }

  async setUser(user: any) {
    await localStorage.setItem(DEV_OPTS.USER_LOGIN, JSON.stringify(user));
  }

  // setUserId(id: string) {
  //   localStorage.setItem(DEV_OPTS.USER_ID, id);
  // }

}
