import { fireEvent, screen, within } from '@testing-library/react';
import { render, wrapStore } from '../../../utils/testUtilities';
import * as universityActions from '../../../redux/modules/universities/actions';
import { MOCK_TEST_DATA } from '../../../utils/mockTestData';
import { AppContentView, UniversityActions } from '../../../redux/modules/universities/types';
import { SearchList } from './SearchList';
import { HomeProvider } from '../HomeProvider';

const LOCAL_STATE = MOCK_TEST_DATA;

describe('SearchList', () => {
  let changeAppViewSpy: jest.SpyInstance<ReturnType<typeof universityActions.changeAppView>>;

  const TestComponent = () => {
    return (
      <HomeProvider>
        <SearchList />
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
    const linkElement = screen.getByText(/Search Results/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('dispatches changeAppView upon clicking of back button', () => {
    render(wrapStore(<TestComponent />, LOCAL_STATE));
    fireEvent.click(screen.getByTestId('search-back-btn'));
    expect(changeAppViewSpy).toHaveBeenCalledTimes(1);
  });

  it('renders search results', () => {
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/Ateneo de Manila/i)).toBeInTheDocument();
  });

  it('renders empty card if there are no universities in the database', () => {
    LOCAL_STATE.universities.universities = [];
    render(wrapStore(<TestComponent />, LOCAL_STATE));

    expect(screen.getByText(/We weren't able to retrieve any universities/i)).toBeInTheDocument();
  });
});
