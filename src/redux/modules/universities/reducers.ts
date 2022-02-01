import { TUniversityActionTypes, TUniversityState, UniversityActions, AppContentView } from './types';

const initialState: TUniversityState = {
  universities: [],
  currentCountry: '',
  isLoading: false,
  appView: AppContentView.Home,
};

export const universities = (state = initialState, action: TUniversityActionTypes): TUniversityState => {
  switch (action.type) {
    case UniversityActions.GET_UNIVERSITIES_PENDING:
      return {
        ...state,
        universities: [],
        isLoading: true,
      };
    case UniversityActions.GET_UNIVERSITIES_SUCCESS:
      return {
        ...state,
        universities: action.payload,
        isLoading: false,
      };
    case UniversityActions.GET_UNIVERSITIES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case UniversityActions.GET_COUNTRY_CODE_SUCCESS:
      return {
        ...state,
        currentCountry: action.payload,
      };
    case UniversityActions.CHANGE_VIEW:
      return {
        ...state,
        appView: action.payload,
      };
    case UniversityActions.RESET_UNIVERSITIES:
      return {
        ...state,
        universities: [],
      };
    default:
      return state;
  }
};
