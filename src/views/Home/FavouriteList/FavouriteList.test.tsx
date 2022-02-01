import { fireEvent, screen } from '@testing-library/react';
import { render, wrapStore } from '../../../utils/testUtilities';
import * as universityActions from '../../../redux/modules/universities/actions';
import { MOCK_TEST_DATA } from '../../../utils/mockTestData';
import { AppContentView, UniversityActions } from '../../../redux/modules/universities/types';
import { FavouriteList } from './FavouriteList';
import { HomeProvider } from '../HomeProvider';

const LOCAL_STATE = MOCK_TEST_DATA;

describe('FavouriteList', () => {
  let changeAppViewSpy: jest.SpyInstance<ReturnType<typeof universityActions.changeAppView>>;

  const TestComponent = () => {
    return (
      <HomeProvider>
        <FavouriteList />
      </HomeProvider>
    );
  };

  beforeEach(() => {
    changeAppViewSpy = jest.spyOn(universityActions, 'changeAppView');
    changeAppViewSpy.mockImplementation(() => ({
      type: UniversityActions.CHANGE_VIEW,
      payload: AppContentView.Home,
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(wrapStore(<TestComponent />, LOCAL_STATE));
    const linkElement = screen.getByText(/My Favourites/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('dispatches changeAppView upon clicking of back button', () => {
    render(wrapStore(<TestComponent />, LOCAL_STATE));
    fireEvent.click(screen.getByTestId('favourite-back-btn'));
    expect(changeAppViewSpy).toHaveBeenCalledTimes(1);
  });

  it('renders favourite universities', () => {
    LOCAL_STATE.firestore.data.users[123].favourites = ['Ateneo de Manila University'];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(screen.getByText(/Ateneo/i)).toBeInTheDocument();
  });

  it('renders an empty card if there are no favourites', () => {
    LOCAL_STATE.firestore.data.users[123].favourites = [];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });
});
