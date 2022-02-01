import { SagaIterator } from 'redux-saga';
import { FirebaseError } from 'firebase';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
import { call, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  FirebaseActions,
  TCreateUserAction,
  TFavouriteUniversityRequest,
  TLoginUserAction,
  TLogoutUserAction,
  TUpdateUserSubscriptionAction,
  TUpdateUserSubscriptionRequest,
  TUserAuthRequest,
} from './types';
import { AppAction } from '../../types';

export function* createUserSaga(action: AppAction<TCreateUserAction, TUserAuthRequest>): SagaIterator<void> {
  const { firebase } = action.hooks;
  try {
    yield call(firebase.createUser, action.payload);
  } catch (err) {
    const error = err as FirebaseError;
    switch (error.code) {
      case 'auth/email-already-in-use':
        notification.error({
          message: 'Error',
          description: 'Email already in use.',
        });
        break;
      default:
        notification.error({
          message: 'Error',
          description: error.code,
        });
        break;
    }
  }
}

export function* loginUserSaga(action: AppAction<TLoginUserAction, TUserAuthRequest>): SagaIterator<void> {
  const { firebase } = action.hooks;
  try {
    yield call(firebase.login, action.payload);
  } catch (err) {
    const error = err as FirebaseError;
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        notification.error({
          message: 'Error',
          description: 'Incorrect user credentials.',
        });
        break;
      default:
        notification.error({
          message: 'Error',
          description: error.code,
        });
        break;
    }
  }
}

export function* logoutUserSaga(action: AppAction<TLogoutUserAction>): SagaIterator<void> {
  const { firebase } = action.hooks;
  try {
    yield call(firebase.logout);
  } catch (err) {
    const error = err as FirebaseError;
    notification.error({
      message: 'Error',
      description: error.code,
    });
  }
}

export function* updateUserSubscriptionSaga(
  action: AppAction<TUpdateUserSubscriptionAction, TUpdateUserSubscriptionRequest>
): SagaIterator<void> {
  const { firestore, auth } = action.hooks;
  const { isSubscribed } = action.payload;

  try {
    const updateCall = () => firestore.collection('users').doc(auth.uid).update({ isSubscribed });
    yield call(updateCall);
  } catch (err) {
    const error = err as FirebaseError;
    notification.error({
      message: 'Error',
      description: error.code,
    });
  }
}

export function* favouriteUniversitySaga(
  action: AppAction<TUpdateUserSubscriptionAction, TFavouriteUniversityRequest>
): SagaIterator<void> {
  const { firestore, auth } = action.hooks;
  const { name, isFavourite } = action.payload;

  try {
    const updateCall = () =>
      firestore
        .collection('users')
        .doc(auth.uid)
        .update({
          favourites: isFavourite ? arrayUnion(name) : arrayRemove(name),
        });
    yield call(updateCall);
  } catch (err) {
    const error = err as FirebaseError;
    notification.error({
      message: 'Error',
      description: error.code,
    });
  }
}

export const firebaseSagas = [
  takeLatest(FirebaseActions.CREATE_USER, createUserSaga),
  takeLatest(FirebaseActions.LOGIN_USER, loginUserSaga),
  takeLatest(FirebaseActions.LOGOUT_USER, logoutUserSaga),
  takeLatest(FirebaseActions.UPDATE_USER_SUBSCRIPTION, updateUserSubscriptionSaga),
  takeLatest(FirebaseActions.FAVOURITE_UNIVERSITY, favouriteUniversitySaga),
];
