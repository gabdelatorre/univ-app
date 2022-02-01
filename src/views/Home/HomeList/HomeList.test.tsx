import { fireEvent, screen, within } from '@testing-library/react';
import { render, wrapStore } from '../../../utils/testUtilities';
import * as universityActions from '../../../redux/modules/universities/actions';
import { MOCK_TEST_DATA } from '../../../utils/mockTestData';
import { AppContentView, UniversityActions } from '../../../redux/modules/universities/types';
import { HomeList } from './HomeList';
import { HomeProvider } from '../HomeProvider';

const LOCAL_STATE = MOCK_TEST_DATA;

describe('HomeList', () => {
  let changeAppViewSpy: jest.SpyInstance<ReturnType<typeof universityActions.changeAppView>>;

  const TestComponent = () => {
    return (
      <HomeProvider>
        <HomeList />
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
    const linkElement = screen.getByText(/View more/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('dispatches changeAppView upon clicking of back button', () => {
    render(wrapStore(<TestComponent />, LOCAL_STATE));
    fireEvent.click(screen.getByText(/View more/i));
    expect(changeAppViewSpy).toHaveBeenCalledTimes(1);
  });

  it('renders favourite universities', () => {
    LOCAL_STATE.firestore.data.users[123].favourites = ['Ateneo de Manila University'];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(within(screen.getByTestId('home-favourite-section')).getByText(/Ateneo de Manila/i)).toBeInTheDocument();
  });

  it('renders other universities', () => {
    LOCAL_STATE.firestore.data.users[123].favourites = [];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(within(screen.getByTestId('home-all-univ-section')).getByText(/Ateneo de Manila/i)).toBeInTheDocument();
  });

  it('renders empty card if there are no universities in the database', () => {
    LOCAL_STATE.universities.universities = [];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(screen.getByText(/We weren't able to retrieve any universities/i)).toBeInTheDocument();
  });
});
