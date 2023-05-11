export interface IRegisterUser {
  gender: string | undefined | null;
  userIp: string | undefined | null;
  username: string | undefined | null;
  register: Date;
}

export interface IUser {
  userId: string | undefined | null;
  gender: string | undefined | null;
  userIp: string | undefined | null;
  username: string | undefined | null;
  register: Date;
}

export interface IMessages {
  receiverId: string | undefined | null;
  senderId: string | undefined | null;
  message: string | undefined | null;
  dateMessage: Date;
}
