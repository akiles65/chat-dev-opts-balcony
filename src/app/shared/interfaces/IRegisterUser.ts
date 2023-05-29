export interface IUpdateUser {
  avatar: string | undefined | null;
  userIp: string | undefined | null;
  name: string | undefined | null;
  dateUpdate: Date;
}

export interface IUsers {
  avatar: string | undefined | null;
  lastUpdate:any;
  name: string | undefined | null;
  message: string | undefined | null;
  unread: boolean;
  userId: string | undefined | null;
  username: string | undefined | null;
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

export interface IRegister {
  avatar: string | undefined | null;
  name: string | undefined | null;
  password: string | undefined | null;
  register: Date;
  userIp: string | undefined | null;
  username: string | undefined | null;
}

export interface IUserLogin {
  avatar: string | undefined | null;
  name: string | undefined | null;
  register: Date;
  userId: string | undefined | null;
  userIp: string | undefined | null;
  username: string | undefined | null;
}

export interface ILogin {
  username: string | undefined | null;
  password: string | undefined | null;
}
