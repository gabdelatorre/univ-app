import { createContext, FC, useContext, useEffect, useState } from 'react';
import { isEmpty, isLoaded, FirebaseReducer } from 'react-redux-firebase';
import { useTypedSelector } from '../utils/useTypedSelector';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const AuthContext = createContext({});

export interface TAuthProviderReturn {
  auth: FirebaseReducer.AuthState;
  isAuthenticated: boolean;
}

const StyledSpinner = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthProvider: FC = ({ children }) => {
  const auth = useTypedSelector((state) => state.firebase.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // keeps isAuthenticated up-to-date
  useEffect(() => {
    setAuthenticated(isLoaded(auth) && !isEmpty(auth));
  }, [auth]);

  const authValues = {
    auth,
    isAuthenticated,
  };

  // render a loader while auth is not yet loaded
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  if (!isLoaded(auth))
    return (
      <StyledSpinner>
        <Spin indicator={antIcon} size='large' />
      </StyledSpinner>
    );

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): TAuthProviderReturn => useContext(AuthContext) as TAuthProviderReturn;
