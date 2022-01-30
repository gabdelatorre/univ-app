import { TGetUniversitiesType, TUniversityActionTypes, UniversitySagaActions } from './types';

export const getUniversities = (req: TGetUniversitiesType): TUniversityActionTypes => ({
  type: UniversitySagaActions.GET_UNIVERSITIES_PENDING,
  payload: req,
});
