import { Injectable } from '@angular/core';
import { IMessages, IUsers } from '../interfaces/IRegisterUser';
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
export class MessagesService {

  constructor() { }

  postMessage(senderId: string, receiverId: string, data: IMessages) {
    query.doc(senderId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
      .collection(DEV_OPTS.MESSAGES)
      .add(data).then();

    query.doc(receiverId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(senderId)
      .collection(DEV_OPTS.MESSAGES)
      .add(data).then();
  }

  postNewConversation(senderId: string, receiverId: string, sender: IUsers, receiver: IUsers) {
    query.doc(senderId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
      .set(sender).then();

    query.doc(receiverId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(senderId)
      .set(receiver).then();
  }

  readMessage(senderId: string, receiverId: string) {
    query.doc(senderId)
      .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
      .update({
        unread: false
      });
  }

  getMessages(senderId: string, receiverId: string) {
    return query.doc(senderId)
             .collection(DEV_OPTS.CONVERSATIONS).doc(receiverId)
             .collection(DEV_OPTS.MESSAGES)
             .orderBy('dateMessage', 'asc');
  }
}
