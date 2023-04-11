import {User} from "../user";

export interface IUserState {
  maskUserName: boolean;
  currentUser: User | null;
}
