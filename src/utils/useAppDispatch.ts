import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  useFirebase,
  useFirestore,
  FirebaseReducer,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase';
import { useAuthContext } from '../views/AuthProvider';

export interface TAppDispatchHooks {
  auth: FirebaseReducer.AuthState;
  firebase: ExtendedFirebaseInstance;
  firestore: ExtendedFirestoreInstance;
}

export const useAppDispatch = () => {
  const reduxDispatch = useDispatch();
  const { auth } = useAuthContext();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const hooks = useMemo(
    () => ({
      auth,
      firebase,
      firestore,
    }),
    [auth, firebase, firestore]
  );

  const dispatch: typeof reduxDispatch = useCallback(
    (dispatchProps) => reduxDispatch({ ...dispatchProps, hooks }),
    [reduxDispatch, hooks]
  );

  return dispatch;
};
