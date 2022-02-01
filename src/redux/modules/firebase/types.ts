import { Action } from '../../types';

export enum FirebaseActions {
  CREATE_USER = '@universities/CREATE_USER',
  LOGIN_USER = '@universities/LOGIN_USER',
  LOGOUT_USER = '@universities/LOGOUT_USER',
  UPDATE_USER_SUBSCRIPTION = '@universities/UPDATE_USER_SUBSCRIPTION',
  FAVOURITE_UNIVERSITY = '@universities/FAVOURITE_UNIVERSITY',
}

export interface TUserAuthRequest {
  email: string;
  password: string;
}

export interface TUpdateUserSubscriptionRequest {
  isSubscribed: boolean;
}

export interface TFavouriteUniversityRequest {
  name: string;
  isFavourite: boolean;
}

export type TCreateUserAction = Action<typeof FirebaseActions.CREATE_USER, TUserAuthRequest>;
export type TLoginUserAction = Action<typeof FirebaseActions.LOGIN_USER, TUserAuthRequest>;
export type TLogoutUserAction = Action<typeof FirebaseActions.LOGOUT_USER>;
export type TUpdateUserSubscriptionAction = Action<
  typeof FirebaseActions.UPDATE_USER_SUBSCRIPTION,
  TUpdateUserSubscriptionRequest
>;
export type TFavouriteUniversityAction = Action<
  typeof FirebaseActions.FAVOURITE_UNIVERSITY,
  TFavouriteUniversityRequest
>;

export type TFirebaseActionTypes =
  | TCreateUserAction
  | TLoginUserAction
  | TLogoutUserAction
  | TUpdateUserSubscriptionAction
  | TFavouriteUniversityAction;
