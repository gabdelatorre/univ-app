import { Typography, Input, Space, Button } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useFirebase } from 'react-redux-firebase';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const { Title, Text, Link } = Typography;

const StyledSpace = styled(Space)`
  width: 400px;
`;

interface TAuthViewContentProps {
  swapView: (view: string) => void;
}

const RegisterContent = ({ swapView }: TAuthViewContentProps) => {
  const firebase = useFirebase();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleCreateAccount = () => {
    firebase.createUser({ email: emailAddress, password });
  };

  const handleGoToLogin = () => {
    swapView('login');
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
      <Title> Welcome to UniSearch! </Title>
      <Input
        size='large'
        value={emailAddress}
        placeholder='Input email address'
        prefix={<UserOutlined />}
        onChange={handleEmailChange}
      />
      <Input.Password
        size='large'
        placeholder='Input password'
        value={password}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlePasswordChange}
      />
      <Input.Password
        size='large'
        placeholder='Confirm password'
        value={cPassword}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handleCPasswordChange}
      />
      <Button type='primary' size='large' block onClick={handleCreateAccount} disabled={isButtonDisabled}>
        {' '}
        Create Account{' '}
      </Button>
      <div>
        <Text>Already have an account? </Text>
        <Link onClick={handleGoToLogin}> Log in here. </Link>
      </div>
    </StyledSpace>
  );
};

export const LoginContent = ({ swapView }: TAuthViewContentProps) => {
  const firebase = useFirebase();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.login({ email: emailAddress, password });
  };

  const handleGoToRegister = () => {
    swapView('register');
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
      <Input size='large' placeholder='Input email address' prefix={<UserOutlined />} onChange={handleEmailChange} />
      <Input.Password
        size='large'
        placeholder='Input password'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlePasswordChange}
      />
      <Button type='primary' size='large' block onClick={handleLogin}>
        {' '}
        Log in{' '}
      </Button>
      <div>
        <Text>Don't have an account? </Text>
        <Link onClick={handleGoToRegister}> Create your account. </Link>
      </div>
    </StyledSpace>
  );
};

export const LoginView = () => {
  const [authView, setAuthView] = useState('register');

  const handleSwapView = (view: string) => {
    setAuthView(view);
  };

  return authView === 'login' ? (
    <LoginContent swapView={handleSwapView} />
  ) : (
    <RegisterContent swapView={handleSwapView} />
  );
};
