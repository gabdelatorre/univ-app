import { Typography, Space } from 'antd';
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

export interface TEmptyCardProps {
  primaryMessage?: string;
  secondaryMessage?: string;
}

export const EmptyCard = ({ primaryMessage, secondaryMessage }: TEmptyCardProps) => {
  return (
    <StyledSpinner>
      <Space direction='vertical' align='center'>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {' '}
          {primaryMessage}{' '}
        </Typography.Title>
        <Typography.Text> {secondaryMessage} </Typography.Text>
      </Space>
    </StyledSpinner>
  );
};
