import styled from 'styled-components';
import { Button as AntdButton, ButtonProps } from 'antd';

const StyledButton = styled(AntdButton)`
  border: 0;
  border-radius: 6px;
  outline: none;
  background-color: #192fa9;
  font-size: 12px;
  text-transform: uppercase;
  color: #ffffff;
  flex-shrink: 0;

  &:hover,
  &:active,
  &:focus {
    background-color: #0b1860;
    color: #ffffff;
  }
`;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}> {children} </StyledButton>;
};
