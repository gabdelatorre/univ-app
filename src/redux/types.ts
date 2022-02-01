import type { Action as ReduxAction } from 'redux';
import { FirestoreReducer } from 'redux-firestore';
import { TAppDispatchHooks } from '../utils/useAppDispatch';

import Entity = FirestoreReducer.Entity;

export type Action<T, P = undefined> = P extends undefined ? ReduxAction<T> : ReduxAction<T> & { payload: P };
export type AppAction<T, P = undefined> = Action<T, P> & { hooks: TAppDispatchHooks };
export interface TUserData {
  email?: string;
  favourites?: string[];
  isSubscribed?: boolean;
}

export interface TFirestoreSchema {
  users: Entity<TUserData>;
}
