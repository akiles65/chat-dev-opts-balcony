import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { IMessages, IRegisterUser, IUser } from '../../shared/interfaces/IRegisterUser';
import { MessagesService } from '../../shared/services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  id: any;
  messages:IMessages[] =[];
  receiverUser?:IUser;
  senderUser?:IUser;
  chat: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private storage: StorageService,
              private userService: UserService,
              private msj: MessagesService) { }

  ngOnInit() {
    this.userChat();
  }

  getId() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  async userChat() {
    const id = this.getId();
    let user:any;
    await this.userService.getUserById(id).then((resp:any) => {
      if (resp.exists) {
        user = {
          userId: resp.id, ...resp.data() as IRegisterUser
        }
      }
    });
    this.receiverUser = user;
    this.senderUser = this.storage.getUser();
    this.userMessages();
  }

  userMessages() {
    const receiverId = this.activatedRoute.snapshot.paramMap.get("id");
    const senderId = this.storage.getUser().userId;
      if (receiverId && senderId) {
        this.msj.getMessages(senderId, receiverId)
          .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change:any) => {
              this.messages.push(change.doc.data() as IMessages);
            });
        });
      }
  }

  async sendMessage() {
    const data = await this.loadingData();
    const senderId = this.storage.getUser().userId;
    const receiverId = this.activatedRoute.snapshot.paramMap.get("id");
    if (senderId && receiverId) {
      this.msj.postMessage(senderId, receiverId, data);
      this.chat = '';
    }
  }

  loadingData(): IMessages {
    const receiverId = this.getId();
    const senderId = this.storage.getUser();
    return {
      receiverId: receiverId,
      senderId: senderId.userId,
      message: this.chat,
      dateMessage: new Date(),
    };
  }

  backToUsers() {
    this.router.navigateByUrl('/users').then();
  }
}
