import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { IUsers, IUserLogin } from '../../shared/interfaces/IRegisterUser';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user?:IUserLogin;
  users: IUsers[] = [];
  searchResult: any;

  constructor(private storageService: StorageService,
              private userService: UserService,
              private router: Router) { }

  async ngOnInit() {
    await this.getAllUsers();
    this.user = await this.storageService.getUserStorage();
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

  async getAllUsers() {
    const userIp = await this.storageService.getIpStorage();
    this.userService.getAllUsers(userIp).then((resp:any) => {
        resp.docs.map((doc:any) => {
          this.users.push({userId: doc.id, ...doc.data()} as IUsers);
        });
      this.searchResult = this.users;
    });
  }

  getChat(id:string) {
    this.router.navigateByUrl(`/chat/${id}`).then();
  }
}
