// selector functions
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IUserState} from "./user-state";

const getUserFeatureState = createFeatureSelector<IUserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName);
