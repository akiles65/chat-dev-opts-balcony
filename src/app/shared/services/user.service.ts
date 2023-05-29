import { Injectable } from '@angular/core';
import {IRegister, IUpdateUser} from '../interfaces/IRegisterUser';
import { DEV_OPTS } from '../constants/constants';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp(environment.firebaseConfig);

const db = firebase.firestore();
const query = db.collection(DEV_OPTS.USER_COLLECTION);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async registerUser(post: IRegister) {
    await query.add(post);
  }

  getAllUsers(userIp:any) {
    return query.where(DEV_OPTS.USER_IP, '!=', userIp).get();
  }

  getUserConversations(userId:string) {
    return query.doc(userId).collection(DEV_OPTS.CONVERSATIONS)
      .orderBy('lastUpdate', 'desc');
  }

  getUserByIp(ip: any) {
    return query.where(DEV_OPTS.USER_IP, '==', ip).get();
  }

  getUserById(id: any) {
    return query.doc(id).get();
  }

  async updateUser(id:string, post:IUpdateUser) {
    await query.doc(id).update(post);
  }

  async setUser(user: any) {
    await localStorage.setItem(DEV_OPTS.USER_LOGIN, JSON.stringify(user));
  }




}
