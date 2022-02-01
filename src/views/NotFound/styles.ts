import styled from 'styled-components';
import { Typography } from 'antd';
import LoginImg from '../../assets/login-img.jpg';

export const ImgWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  background-image: url(${LoginImg});
  background-position: center;
  background-size: 100%;
  align-items: center;
  justify-content: center;
`;

export const MessageCard = styled.div`
  background-color: #ffffff;
  border-radius: 6px;
  padding: 24px 48px;
  width: 400px;
  height: 300px;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const MessageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledTitle = styled(Typography.Title)`
  margin: 0 !important;
`;

export const StyledText = styled(Typography.Text)`
  align: center;
`;
