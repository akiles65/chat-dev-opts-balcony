import { Injectable } from '@angular/core';
import { IMessages, IUser } from '../interfaces/IRegisterUser';
import { DEV_OPTS } from '../constants/constants';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp(environment.firebaseConfig);

const db = firebase.firestore();

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  postMessage(senderId: string, receiverId: string, data: IMessages) {
    db.collection(DEV_OPTS.USER_COLLECTION).doc(senderId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
      .collection(DEV_OPTS.MESSAGES)
      .add(data).then();

    db.collection(DEV_OPTS.USER_COLLECTION).doc(receiverId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(senderId)
      .collection(DEV_OPTS.MESSAGES)
      .add(data).then();
  }

  postNewConversation(senderId: string, receiverId: string, sender: IUser, receiver: IUser) {
    db.collection(DEV_OPTS.USER_COLLECTION).doc(senderId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
      .set(sender).then();

    db.collection(DEV_OPTS.USER_COLLECTION).doc(receiverId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(senderId)
      .set(receiver).then();
  }

  getMessages(senderId: string, receiverId: string) {
    return db.collection(DEV_OPTS.USER_COLLECTION).doc(senderId)
             .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
             .collection(DEV_OPTS.MESSAGES)
             .orderBy('dateMessage', 'asc');
  }
}
