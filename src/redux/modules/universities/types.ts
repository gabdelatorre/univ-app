import { Action } from '../../types';

export enum UniversitySagaActions {
  GET_UNIVERSITIES_PENDING = '@universities/GET_UNIVERSITIES_PENDING',
  GET_UNIVERSITIES_SUCCESS = '@universities/GET_UNIVERSITIES_SUCCESS',
  GET_UNIVERSITIES_ERROR = '@universities/GET_UNIVERSITIES_ERROR',
}

export interface TUniversityState {
  universities: TUniversityDetails[];
  isLoading: boolean;
}

export interface TUniversityDetails {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  'state-province': string;
  web_pages: string[];
}

export interface TGetUniversitiesType {
  name?: string;
  country?: string;
}

export type TGetUniversitiesPending = Action<
  typeof UniversitySagaActions.GET_UNIVERSITIES_PENDING,
  TGetUniversitiesType
>;
export type TGetUniversitiesSuccess = Action<
  typeof UniversitySagaActions.GET_UNIVERSITIES_SUCCESS,
  TUniversityDetails[]
>;
export type TGetUniversitiesError = Action<typeof UniversitySagaActions.GET_UNIVERSITIES_ERROR>;

export type TUniversityActionTypes = TGetUniversitiesPending | TGetUniversitiesSuccess | TGetUniversitiesError;
