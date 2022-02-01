import styled from 'styled-components';
import { Layout, Typography } from 'antd';

export const StyledHeader = styled(Layout.Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled(Typography.Title)`
  margin: 0 !important;
`;

export const StyledContent = styled(Layout.Content)`
  min-height: calc(100vh - 134px);
  padding: 64px 48px 48px;
`;

export const Banner = styled.div`
  background-color: #0b1860;
  height: 300px;
  padding: 24px;
  border-radius: 6px;
  position: relative;
  margin: 24px auto 72px;
  max-width: 1400px;
`;

export const ContentSection = styled.section`
  max-width: 1400px;
  min-height: 300px;
  margin: 0 auto 48px;
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin-bottom: 16px;
  justify-content: space-between;

  h2 {
    margin: 0;
  }
`;

export const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackButton = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    background-color: #192fa9;
    color: #ffffff;
  }
`;

export const SubscriptionBanner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: auto;
  min-height: 150px;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubscriptionSection = styled.section`
  min-height: 300px;
  padding: 24px 48px;
  background-color: #192fa9;
  display: flex;
`;

export const SearchBarContainer = styled.div`
  position: absolute;
  bottom: -32px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  max-width: 1200px;
  padding: 0 48px;
`;

export const StyledFooter = styled(Layout.Footer)`
  display: flex;
  background-color: #0b1860;
  color: #adbcd4;
  justify-content: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
