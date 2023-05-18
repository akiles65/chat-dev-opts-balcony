export interface IRegisterUser {
  avatar: string | undefined | null;
  userIp: string | undefined | null;
  username: string | undefined | null;
  register: Date;
}

export interface IUser {
  userId: string | undefined | null;
  avatar: string | undefined | null;
  username: string | undefined | null;
  message: string | undefined | null;
  unread: boolean;
  lastMessage:any;
}

export interface IConversation {
  userId: string | undefined | null;
  avatar: string | undefined | null;
  username: string | undefined | null;
  message: string | undefined | null;
  unread: boolean;
  lastMessage:any;
}

export interface IMessages {
  receiverId: string | undefined | null;
  senderId: string | undefined | null;
  message: string | undefined | null;
  dateMessage: any;
}

export interface IAvatar {
  img: string;
}
