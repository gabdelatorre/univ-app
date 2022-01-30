import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { buildQuery } from '../../../utils/buildQuery';
import {
  TGetUniversitiesError,
  TGetUniversitiesPending,
  TGetUniversitiesSuccess,
  UniversitySagaActions,
} from './types';

export function* getUniversitiesSaga(action: TGetUniversitiesPending): SagaIterator<void> {
  const queryStr = buildQuery(action.payload);
  console.log('queryStr', queryStr);
  try {
    const { data } = yield call(api, { url: `search${queryStr}` });
    yield put<TGetUniversitiesSuccess>({ type: UniversitySagaActions.GET_UNIVERSITIES_SUCCESS, payload: data });
  } catch (error) {
    yield put<TGetUniversitiesError>({ type: UniversitySagaActions.GET_UNIVERSITIES_ERROR });
  }
}

export const universitySagas = [takeLatest(UniversitySagaActions.GET_UNIVERSITIES_PENDING, getUniversitiesSaga)];
