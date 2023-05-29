import { Component, OnInit, ViewChild } from '@angular/core';
import { IUsers, IUserLogin } from "../../shared/interfaces/IRegisterUser";
import { StorageService } from "../../shared/services/storage.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { IonList } from "@ionic/angular";
import { MessagesService } from "../../shared/services/messages.service";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  @ViewChild(IonList) ionList:IonList;

  user?:IUserLogin;
  users: IUsers[] = [];
  searchResult: any;

  constructor(private messageService: MessagesService,
              private storageService: StorageService,
              private userService: UserService,
              private router: Router) { }

  async ngOnInit() {
    this.user = await this.storageService.getUserStorage();
    await this.getUserConversations();
  }

  searchUser(search: any) {
    const text = search.detail.value;
    this.searchResult = this.users;
    if(text && text.trim() != '') {
      this.searchResult = this.searchResult.filter((user: any) => {
        return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }

  async getUserConversations() {
    const user: IUserLogin = await this.storageService.getUserStorage();

    if (user.userId) {
      this.userService.getUserConversations(user.userId)
        .onSnapshot((snapshot:any) => {
          snapshot.docChanges().forEach(() => {
            this.updated(user.userId);
          });
        });
    }
  }

  updated(userId:any) {
    if (userId) {
      this.userService.getUserConversations(userId)
        .get().then((resp:any) => {
        this.users = [];
        resp.docs.map((doc:any) => {
          this.users.push({
            receiverId: doc.id,
            ...doc.data()
          } as IUsers);
        });
        this.searchResult = this.users;
      });
    }
  }

  getChat(receiverId:string) {
    const senderId = this.user?.userId;
    this.router.navigateByUrl(`/chat/${receiverId}`).then(() => {
      if (senderId) {
        this.messageService.readMessage(senderId, receiverId);
      }
    });
  }

  setCookies() {
    this.storageService.setCookies().then(() => {
      this.ionList.closeSlidingItems().then(() => {
        console.log('Enviar Cookies..!');
      });
    });
  }

  getUserStorage() {
    const cookies = this.storageService.getCookies();
    console.log(cookies);
    this.ionList.closeSlidingItems().then(() => {
      console.log('Octener Cookies..!');
    });
  }

  delete() {
    this.storageService.deleteCookies().then(() => {
      this.ionList.closeSlidingItems().then(() => {
        console.log('Eliminar Cookies..!');
      });
    });
  }
}
