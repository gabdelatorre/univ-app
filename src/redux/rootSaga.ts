import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';
import { universitySagas } from './modules/universities/sagas';
import { firebaseSagas } from './modules/firebase/sagas';

export function* rootSaga(): SagaIterator {
  yield all([...universitySagas, ...firebaseSagas]);
}
