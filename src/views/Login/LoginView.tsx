import { Typography } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { StyledSpace, StyledInput, StyledPassword, MainWrapper, ImgWrapper, FormWrapper } from './styles';
import { AuthView, TAuthViewContentProps } from './types';
import { ChangeEvent, useState } from 'react';
import { Button } from '../../components';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { createUser, loginUser } from '../../redux/modules/firebase/actions';

const { Title, Text, Link } = Typography;

export const RegisterContent = ({ swapView }: TAuthViewContentProps) => {
  const dispatch = useAppDispatch();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleCreateAccount = () => {
    dispatch(createUser({ email: emailAddress, password }));
  };

  const handleGoToLogin = () => {
    swapView(AuthView.Login);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailAddress(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCPassword(value);
    setIsError(value !== password);
  };

  const isButtonDisabled = isError || !emailAddress || !password || !cPassword;

  return (
    <StyledSpace direction='vertical'>
      <Title>
        {' '}
        Welcome to <span style={{ color: '#192fa9' }}>Uni</span>Search!{' '}
      </Title>
      <StyledInput
        data-testid='reg-email-input'
        size='large'
        value={emailAddress}
        placeholder='Input email address'
        prefix={<UserOutlined />}
        onChange={handleEmailChange}
      />
      <StyledPassword
        data-testid='reg-pass-input'
        size='large'
        placeholder='Input password'
        value={password}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlePasswordChange}
      />
      <StyledPassword
        data-testid='reg-cpass-input'
        size='large'
        placeholder='Confirm password'
        value={cPassword}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handleCPasswordChange}
      />
      <Button
        data-testid='create-account-btn'
        type='primary'
        size='large'
        block
        onClick={handleCreateAccount}
        disabled={isButtonDisabled}
      >
        {' '}
        Create Account{' '}
      </Button>
      <br />
      <div>
        <Text>Already have an account? </Text>
        <Link data-testid='go-to-login-btn' onClick={handleGoToLogin}>
          {' '}
          Log in here.{' '}
        </Link>
      </div>
    </StyledSpace>
  );
};

export const LoginContent = ({ swapView }: TAuthViewContentProps) => {
  const dispatch = useAppDispatch();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(loginUser({ email: emailAddress, password }));
  };

  const handleGoToRegister = () => {
    swapView(AuthView.Register);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailAddress(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <StyledSpace direction='vertical'>
      <Title> Log in. </Title>
      <StyledInput
        size='large'
        placeholder='Input email address'
        prefix={<UserOutlined />}
        onChange={handleEmailChange}
      />
      <StyledPassword
        size='large'
        placeholder='Input password'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlePasswordChange}
      />
      <Button data-testid='login-btn' type='primary' size='large' block onClick={handleLogin}>
        {' '}
        Log in{' '}
      </Button>
      <br />
      <div>
        <Text>Don't have an account? </Text>
        <Link data-testid='go-to-register-btn' onClick={handleGoToRegister}>
          {' '}
          Create your account.{' '}
        </Link>
      </div>
    </StyledSpace>
  );
};

export const LoginView = () => {
  const [authView, setAuthView] = useState(AuthView.Register);

  const handleSwapView = (view: AuthView) => {
    setAuthView(view);
  };

  return (
    <MainWrapper>
      <ImgWrapper />
      <FormWrapper>
        {authView === AuthView.Login ? (
          <LoginContent swapView={handleSwapView} />
        ) : (
          <RegisterContent swapView={handleSwapView} />
        )}
      </FormWrapper>
    </MainWrapper>
  );
};
