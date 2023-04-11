import {createAction, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IUserState} from "./user-state";


const initialState: IUserState = {
  maskUserName: true,
  currentUser: null,
}

// selector functions
const getUserFeatureState = createFeatureSelector<IUserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName);

export const userReducer = createReducer<IUserState>(
  initialState,
  on(createAction('[User] Mask User Name'), (state): IUserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
)
