import { TGetUniversitiesType, TUniversityActionTypes, UniversityActions, AppContentView } from './types';

export const getUniversities = (req: TGetUniversitiesType): TUniversityActionTypes => ({
  type: UniversityActions.GET_UNIVERSITIES_PENDING,
  payload: req,
});

export const getLocation = (): TUniversityActionTypes => ({
  type: UniversityActions.GET_COUNTRY_CODE_PENDING,
});

export const changeAppView = (req: AppContentView): TUniversityActionTypes => ({
  type: UniversityActions.CHANGE_VIEW,
  payload: req,
});

export const resetUniversities = (): TUniversityActionTypes => ({
  type: UniversityActions.RESET_UNIVERSITIES,
});
