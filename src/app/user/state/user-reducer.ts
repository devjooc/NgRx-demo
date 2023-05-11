import {createReducer, on} from "@ngrx/store";
import {IUserState} from "./user-state";
// user actions
import * as UserActions from './user-actions';


const initialState: IUserState = {
  maskUserName: true,
  currentUser: null,
}

export const userReducer = createReducer<IUserState>(
  initialState,
  on(UserActions.maskUserName, (state): IUserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
)
