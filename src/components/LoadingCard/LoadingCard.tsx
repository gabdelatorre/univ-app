import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  padding: 24px;
  background-color: #dbdde8;
  border-radius: 6px;
  margin-bottom: 16px;
`;

export const LoadingCard = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <StyledSpinner>
      <Spin indicator={antIcon} size='large' />
    </StyledSpinner>
  );
};
