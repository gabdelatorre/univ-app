import { fireEvent, screen } from '@testing-library/react';
import { render, wrapStore } from '../../utils/testUtilities';
import { LoginView, RegisterContent, LoginContent } from './LoginView';
import { AuthView } from './types';
import * as firebaseActions from '../../redux/modules/firebase/actions';
import { FirebaseActions } from '../../redux/modules/firebase/types';
import { MOCK_TEST_DATA } from '../../utils/mockTestData';

const LOCAL_STATE = MOCK_TEST_DATA;

describe('LoginView', () => {
  let createUserSpy: jest.SpyInstance<ReturnType<typeof firebaseActions.createUser>>;
  let loginUserSpy: jest.SpyInstance<ReturnType<typeof firebaseActions.loginUser>>;

  beforeEach(() => {
    createUserSpy = jest.spyOn(firebaseActions, 'createUser');
    createUserSpy.mockImplementation(() => ({
      type: FirebaseActions.CREATE_USER,
      payload: { email: '', password: '' },
    }));
    loginUserSpy = jest.spyOn(firebaseActions, 'loginUser');
    loginUserSpy.mockImplementation(() => ({
      type: FirebaseActions.LOGIN_USER,
      payload: { email: '', password: '' },
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(wrapStore(<LoginView />, LOCAL_STATE));
    const linkElement = screen.getByText(/Already have an account/i);
    expect(linkElement).toBeInTheDocument();
  });

  describe('renders RegisterContent', () => {
    it('swaps to login mode upon clicking create account link', () => {
      let appView = AuthView.Register;
      const swapView = (view: AuthView) => (appView = view);
      render(wrapStore(<RegisterContent swapView={swapView} />, LOCAL_STATE));
      fireEvent.click(screen.getByTestId('go-to-login-btn'));

      expect(appView).toBe(AuthView.Login);
    });

    it('dispatches createUser upon clicking submit button', () => {
      render(wrapStore(<RegisterContent swapView={jest.fn()} />, LOCAL_STATE));

      const emailField = screen.getByPlaceholderText(/Input email address/i) as HTMLInputElement;
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });

      const passField = screen.getByPlaceholderText(/Input password/i) as HTMLInputElement;
      fireEvent.change(passField, { target: { value: 'test123' } });

      const cPassField = screen.getByPlaceholderText(/Confirm password/i) as HTMLInputElement;
      fireEvent.change(cPassField, { target: { value: 'test123' } });

      fireEvent.click(screen.getByTestId('create-account-btn'));

      expect(createUserSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('renders LoginContent', () => {
    it('swaps to register mode upon clicking login link', () => {
      let appView = AuthView.Login;
      const swapView = (view: AuthView) => (appView = view);
      render(wrapStore(<LoginContent swapView={swapView} />, LOCAL_STATE));
      fireEvent.click(screen.getByTestId('go-to-register-btn'));

      expect(appView).toBe(AuthView.Register);
    });

    it('dispatches loginUser upon clicking submit button', () => {
      render(wrapStore(<LoginContent swapView={jest.fn()} />, LOCAL_STATE));

      const emailField = screen.getByPlaceholderText(/Input email address/i) as HTMLInputElement;
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });

      const passField = screen.getByPlaceholderText(/Input password/i) as HTMLInputElement;
      fireEvent.change(passField, { target: { value: 'test123' } });

      fireEvent.click(screen.getByTestId('login-btn'));

      expect(loginUserSpy).toHaveBeenCalledTimes(1);
    });
  });
});
