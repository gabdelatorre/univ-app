import { TUniversityActionTypes, TUniversityState, UniversitySagaActions } from './types';

const initialState: TUniversityState = {
  universities: [],
  isLoading: false,
};

export const universities = (state = initialState, action: TUniversityActionTypes): TUniversityState => {
  switch (action.type) {
    case UniversitySagaActions.GET_UNIVERSITIES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case UniversitySagaActions.GET_UNIVERSITIES_SUCCESS:
      return {
        ...state,
        universities: action.payload,
        isLoading: false,
      };
    case UniversitySagaActions.GET_UNIVERSITIES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
