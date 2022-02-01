import { Action } from '../../types';

export enum UniversityActions {
  CHANGE_VIEW = '@universities/CHANGE_VIEW',
  RESET_UNIVERSITIES = '@universities/RESET_UNIVERSITIES',
  GET_UNIVERSITIES_PENDING = '@universities/GET_UNIVERSITIES_PENDING',
  GET_UNIVERSITIES_SUCCESS = '@universities/GET_UNIVERSITIES_SUCCESS',
  GET_UNIVERSITIES_ERROR = '@universities/GET_UNIVERSITIES_ERROR',
  GET_COUNTRY_CODE_PENDING = '@universities/GET_COUNTRY_CODE_PENDING',
  GET_COUNTRY_CODE_SUCCESS = '@universities/GET_COUNTRY_CODE_SUCCESS',
  GET_COUNTRY_CODE_ERROR = '@universities/COUNTRY_CODE_ERROR',
}

export enum AppContentView {
  Home,
  Search,
  Favourites,
}

export interface TUniversityState {
  universities: TUniversityDetails[];
  isLoading: boolean;
  currentCountry: string;
  appView: AppContentView;
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
export type TChangeView = Action<typeof UniversityActions.CHANGE_VIEW, AppContentView>;
export type TResetUniversities = Action<typeof UniversityActions.RESET_UNIVERSITIES>;

export type TGetUniversitiesPending = Action<typeof UniversityActions.GET_UNIVERSITIES_PENDING, TGetUniversitiesType>;
export type TGetUniversitiesSuccess = Action<typeof UniversityActions.GET_UNIVERSITIES_SUCCESS, TUniversityDetails[]>;
export type TGetUniversitiesError = Action<typeof UniversityActions.GET_UNIVERSITIES_ERROR>;

export type TGetCountryCodePending = Action<typeof UniversityActions.GET_COUNTRY_CODE_PENDING>;
export type TGetCountryCodeSuccess = Action<typeof UniversityActions.GET_COUNTRY_CODE_SUCCESS, string>;
export type TGetCountryCodeError = Action<typeof UniversityActions.GET_COUNTRY_CODE_ERROR>;

export type TUniversityActionTypes =
  | TChangeView
  | TResetUniversities
  | TGetUniversitiesPending
  | TGetUniversitiesSuccess
  | TGetUniversitiesError
  | TGetCountryCodePending
  | TGetCountryCodeSuccess
  | TGetCountryCodeError;
