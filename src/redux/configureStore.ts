import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer, FirestoreReducer } from 'redux-firestore';
import saga from 'redux-saga';

import { TFirestoreSchema } from './types';
import { reducers } from './modules';
import { routesMap } from './routing/routesMap';
import { rootSaga } from './rootSaga';

const { enhancer, middleware, reducer } = connectRoutes(routesMap, {});
const rootReducer = combineReducers({
  location: reducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  ...reducers,
});
const sagaMiddleware = saga();
export const store = createStore(rootReducer, compose(enhancer, applyMiddleware(sagaMiddleware, middleware)));

export type LocationState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export type AllStates = ReturnType<typeof store.getState>;
export interface RootState extends AllStates {
  firestore: FirestoreReducer.Reducer<TFirestoreSchema>;
}

sagaMiddleware.run(rootSaga);
