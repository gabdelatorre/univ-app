import { fireEvent, screen } from '@testing-library/react';
import { render, wrapStore } from '../../utils/testUtilities';
import { HomeView } from './HomeView';
import * as firebaseActions from '../../redux/modules/firebase/actions';
import * as universityActions from '../../redux/modules/universities/actions';
import { FirebaseActions } from '../../redux/modules/firebase/types';
import { MOCK_TEST_DATA } from '../../utils/mockTestData';
import { AppContentView, UniversityActions } from '../../redux/modules/universities/types';

const LOCAL_STATE = MOCK_TEST_DATA;

describe('HomeView', () => {
  let logoutUserSpy: jest.SpyInstance<ReturnType<typeof firebaseActions.logoutUser>>;
  let subscribeSpy: jest.SpyInstance<ReturnType<typeof firebaseActions.updateUserSubscription>>;
  let getUniversitiesSpy: jest.SpyInstance<ReturnType<typeof universityActions.getUniversities>>;

  beforeEach(() => {
    logoutUserSpy = jest.spyOn(firebaseActions, 'logoutUser');
    logoutUserSpy.mockImplementation(() => ({
      type: FirebaseActions.LOGOUT_USER,
    }));

    subscribeSpy = jest.spyOn(firebaseActions, 'updateUserSubscription');
    subscribeSpy.mockImplementation(() => ({
      type: FirebaseActions.UPDATE_USER_SUBSCRIPTION,
      payload: { isSubscribed: true },
    }));

    getUniversitiesSpy = jest.spyOn(universityActions, 'getUniversities');
    getUniversitiesSpy.mockImplementation(() => ({
      type: UniversityActions.GET_UNIVERSITIES_PENDING,
      payload: { name: '', country: '' },
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(wrapStore(<HomeView />, LOCAL_STATE));
    const linkElement = screen.getByText(/Logout/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('dispatches logoutUser upon clicking of logout', () => {
    render(wrapStore(<HomeView />, LOCAL_STATE));

    fireEvent.click(screen.getByText(/Logout/i));
    expect(logoutUserSpy).toHaveBeenCalledTimes(1);
  });

  it('dispatches updateUserSubscription upon clicking of subscribe button', () => {
    render(wrapStore(<HomeView />, LOCAL_STATE));

    fireEvent.click(screen.getByTestId('subscribe-btn'));
    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('dispatches getUniversities upon clicking of search button', () => {
    render(wrapStore(<HomeView />, LOCAL_STATE));

    const universityField = screen.getByPlaceholderText(/University name/) as HTMLInputElement;
    fireEvent.change(universityField, { target: { value: 'Middle' } });

    const countryField = screen.getByPlaceholderText(/Country/) as HTMLInputElement;
    fireEvent.change(countryField, { target: { value: 'United States' } });

    fireEvent.click(screen.getByTestId('search-btn'));
    expect(getUniversitiesSpy).toHaveBeenCalledTimes(1);
  });

  it.each([
    { name: 'HomeList', appView: AppContentView.Home, text: /View more/ },
    { name: 'SearchList', appView: AppContentView.Search, text: /Search Results/ },
    { name: 'FavouriteList', appView: AppContentView.Favourites, text: /My Favourites/ },
  ])('renders $name if appView is $appView', ({ appView, text }) => {
    LOCAL_STATE.universities.appView = appView;
    render(wrapStore(<HomeView />, LOCAL_STATE));

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
