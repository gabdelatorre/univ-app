import {
  FirebaseActions,
  TUserAuthRequest,
  TFirebaseActionTypes,
  TUpdateUserSubscriptionRequest,
  TFavouriteUniversityRequest,
} from './types';

export const createUser = (payload: TUserAuthRequest): TFirebaseActionTypes => ({
  type: FirebaseActions.CREATE_USER,
  payload,
});

export const loginUser = (payload: TUserAuthRequest): TFirebaseActionTypes => ({
  type: FirebaseActions.LOGIN_USER,
  payload,
});

export const logoutUser = (): TFirebaseActionTypes => ({
  type: FirebaseActions.LOGOUT_USER,
});

export const updateUserSubscription = (payload: TUpdateUserSubscriptionRequest): TFirebaseActionTypes => ({
  type: FirebaseActions.UPDATE_USER_SUBSCRIPTION,
  payload,
});

export const favouriteUniversity = (payload: TFavouriteUniversityRequest): TFirebaseActionTypes => ({
  type: FirebaseActions.FAVOURITE_UNIVERSITY,
  payload,
});
