import { Provider } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import { store } from '../redux/configureStore';
import { Routes } from '../redux/routing/routesMap';
import { useTypedSelector } from '../utils/useTypedSelector';
import { HomeView } from './Home/HomeView';
import { LoginView } from './Login/LoginView';
import { NotFoundView } from './NotFound/NotFoundView';
import firebase from '../firebase';
import { AuthProvider, useAuthContext } from './AuthProvider';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const RootView = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useTypedSelector((state) => state.location.type);

  switch (location) {
    case Routes.LOGIN:
      return !isAuthenticated ? <LoginView /> : <HomeView />;
    case Routes.HOME:
      return isAuthenticated ? <HomeView /> : <LoginView />;
    case NOT_FOUND:
    default:
      return <NotFoundView />;
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthProvider>
          <RootView />
        </AuthProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
