import styled from 'styled-components';
import { Space, Input } from 'antd';
import LoginImg from '../../assets/login-img.jpg';

export const StyledInput = styled(Input)`
  border-radius: 6px;
`;

export const StyledPassword = styled(Input.Password)`
  border-radius: 6px;
`;

export const StyledSpace = styled(Space)`
  width: 400px;
`;

export const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const ImgWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  background-image: url(${LoginImg});
  background-position: center;
  background-size: 1800px;
`;

export const FormWrapper = styled.div`
  display: flex;
  min-width: 800px;
  justify-content: center;
`;
