import { Component, OnInit } from '@angular/core';
import { IUser } from "../../shared/interfaces/IRegisterUser";
import { StorageService } from "../../shared/services/storage.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  user?:IUser;
  users: IUser[] = [];
  searchResult: any;

  constructor(private storage: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log('hola');
    this.getUserConversations();
    this.user = this.storage.getUser();
  }

  searchUser(search: any) {
    const text = search.detail.value;
    this.searchResult = this.users;
    if(text && text.trim() != '') {
      this.searchResult = this.searchResult.filter((user: any) => {
        return (user.username.toLowerCase().indexOf(text.toLowerCase()) > -1);
      });
    }
  }

  getUserConversations() {
    const userId = this.storage.getUser().userId;

    // if (userId) {
    //   this.userService.getUserConversations(userId)
    //     .onSnapshot((snapshot:any) => {
    //       console.log(snapshot);
    //       snapshot.docChanges().forEach((change:any) => {
    //         this.users.push({receiverId: change.doc.id, ...change.doc.data()} as IUser);
    //       });
    //       this.searchResult = this.users;
    //       // this.users = [];
    //     });
    // }
    this.userService.getUserConversations(userId).then((resp:any) => {
      resp.docs.map((doc:any) => {
        this.users.push({receiverId: doc.id, ...doc.data()} as IUser);
      });
      this.searchResult = this.users;
    });
  }

  getChat(id:string) {
    this.router.navigateByUrl(`/chat/${id}`).then();
  }

}
