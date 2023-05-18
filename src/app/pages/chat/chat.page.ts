import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';
import { IMessages, IRegisterUser, IUser } from '../../shared/interfaces/IRegisterUser';
import { MessagesService } from '../../shared/services/messages.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('target', { static: false }) target?: ElementRef;
  @ViewChild(IonContent, { static: false }) ionContent?: IonContent;

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
    this.userChat().then(() => {
      setTimeout(() => {
        if (this.ionContent) {
          this.ionContent.scrollToPoint(0, this.target?.nativeElement.offsetTop, 50).then();
        }
      }, 400);
    });
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
              this.goToLastMessage(this.target?.nativeElement);
            });
        });
      }
  }

  async sendMessage(target:any) {
    const data = await this.loadingData();
    const sender = await this.sender();
    const receiver = await this.receiver();
    const senderId = this.storage.getUser().userId;
    const receiverId = this.activatedRoute.snapshot.paramMap.get("id");
    if (senderId && receiverId) {
      this.msj.postMessage(senderId, receiverId, data);
      this.msj.postNewConversation(senderId, receiverId, sender, receiver);
      this.chat = '';
      this.goToLastMessage(target);
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

  sender(): IUser {
    const userId = this.storage.getUser();
    const user = this.receiverUser;
    return {
      userId: userId.userId,
      avatar: user?.avatar,
      username: user?.username,
      message: this.chat,
      unread: false,
      lastMessage: new Date()
    }
  }

  receiver(): IUser {
    const userId = this.storage.getUser();
    const user = this.storage.getUser();
    return {
      userId: userId.userId,
      avatar: user?.avatar,
      username: user?.username,
      message: this.chat,
      unread: true,
      lastMessage: new Date()
    }
  }

  goToLastMessage(target:any) {
    if (this.ionContent) {
      this.ionContent.scrollToPoint(0, target.offsetTop, 35).then();
    }
  }

  backToConversations() {
    this.router.navigateByUrl('/conversations').then();
  }

  backToUsers() {
    this.router.navigateByUrl('/users').then();
  }
}
