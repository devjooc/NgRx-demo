import {IUserState} from "../user/state/user-state";

export interface AppState {
  user: IUserState; // users module is not lazy loaded so do that here is ok
}

/* here we don't include states of lazy loading modules
* instead => see product-reducer for example
* */
