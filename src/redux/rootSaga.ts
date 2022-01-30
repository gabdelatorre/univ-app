import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';
import { universitySagas } from './modules/universities/sagas';

export function* rootSaga(): SagaIterator {
  yield all([...universitySagas]);
}
