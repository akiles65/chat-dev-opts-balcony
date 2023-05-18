import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/IRegisterUser';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user?:IUser;
  users: IUser[] = [];
  searchResult: any;

  constructor(private storage: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
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

  getAllUsers() {
    const userId = this.storage.getIp();
    this.userService.getAllUsers(userId).then((resp:any) => {
        resp.docs.map((doc:any) => {
          this.users.push({userId: doc.id, ...doc.data()} as IUser);
        });
      this.searchResult = this.users;
    });
  }

  getChat(id:string) {
    this.router.navigateByUrl(`/chat/${id}`).then();
  }
}
