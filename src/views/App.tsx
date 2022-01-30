import { Provider } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { store } from '../redux/configureStore';
import { Routes } from '../redux/routing/routesMap';
import { useTypedSelector } from '../utils/useTypedSelector';
import { HomeView } from './Home/HomeView';
import { LoginView } from './Login/LoginView';
import { NotFoundView } from './NotFoundView';

const RootView = () => {
  const location = useTypedSelector((state) => state.location.type);

  switch (location) {
    case Routes.LOGIN:
      return <LoginView />;
    case Routes.HOME:
      return <HomeView />;
    case NOT_FOUND:
    default:
      return <NotFoundView />;
  }
};

const App = () => {
  return (
    <Provider store={store}>
      {' '}
      <RootView />{' '}
    </Provider>
  );
};

export default App;
