import { Injectable } from '@angular/core';
import { DEV_OPTS } from '../constants/constants';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ILogin } from "../interfaces/IRegisterUser";

firebase.initializeApp(environment.firebaseConfig);

const db = firebase.firestore();
const query = db.collection(DEV_OPTS.USER_COLLECTION);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  usernameValidate(username: string) {
    return query.where(DEV_OPTS.USERNAME, '==', username).get();
  }

  getUser(user: ILogin) {
    return query.where(DEV_OPTS.USERNAME, '==', user.username)
      .where(DEV_OPTS.PASSWORD, '==', user.password).get();
  }
}
