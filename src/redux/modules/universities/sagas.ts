import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { buildQuery } from '../../../utils/buildQuery';
import { getUniversities } from './actions';
import {
  TGetCountryCodeError,
  TGetCountryCodeSuccess,
  TGetUniversitiesError,
  TGetUniversitiesPending,
  TGetUniversitiesSuccess,
  TUniversityDetails,
  UniversityActions,
} from './types';

export function* getUniversitiesSaga(action: TGetUniversitiesPending): SagaIterator<void> {
  const queryStr = buildQuery(action.payload);
  try {
    const { data } = yield call(api, { url: `http://universities.hipolabs.com/search${queryStr}` });
    const dataList = data as TUniversityDetails[];
    // needs to be filtered by unique keys as sometimes the API provides multiple duplicates
    const filteredList = Array.from(new Set(dataList.map((item) => item.name))).map(
      (uniq) => dataList.find((dat) => dat.name === uniq) ?? ({} as TUniversityDetails)
    );
    yield put<TGetUniversitiesSuccess>({ type: UniversityActions.GET_UNIVERSITIES_SUCCESS, payload: filteredList });
  } catch (error) {
    yield put<TGetUniversitiesError>({ type: UniversityActions.GET_UNIVERSITIES_ERROR });
  }
}

export function* getCountryCodeSaga(): SagaIterator<void> {
  try {
    const { data } = yield call(api, { url: `https://ipapi.co/json/` });
    yield put<TGetCountryCodeSuccess>({
      type: UniversityActions.GET_COUNTRY_CODE_SUCCESS,
      payload: data.country_name,
    });
    yield put(getUniversities({ country: data.country_name }));
  } catch (error) {
    yield put<TGetCountryCodeError>({ type: UniversityActions.GET_COUNTRY_CODE_ERROR });
  }
}

export const universitySagas = [
  takeLatest(UniversityActions.GET_UNIVERSITIES_PENDING, getUniversitiesSaga),
  takeLatest(UniversityActions.GET_COUNTRY_CODE_PENDING, getCountryCodeSaga),
];
