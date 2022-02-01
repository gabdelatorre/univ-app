import Link from 'redux-first-router-link';
import { Space } from 'antd';
import { Button } from '../../components';
import { Routes } from '../../redux/routing/routesMap';
import { ImgWrapper, MessageCard, MessageTitle, StyledText, StyledTitle } from './styles';

export const NotFoundView = () => {
  return (
    <ImgWrapper>
      <MessageCard>
        <Space direction='vertical' align='center' size={24}>
          <MessageTitle>
            <StyledTitle level={1}> 404 </StyledTitle>
            <StyledTitle level={4}> Page not found</StyledTitle>
          </MessageTitle>
          <StyledText>The page you are trying to access does not exist. Try going back to our homepage.</StyledText>
          <Link to={{ type: Routes.LOGIN }}>
            <Button>Go to homepage</Button>
          </Link>
        </Space>
      </MessageCard>
    </ImgWrapper>
  );
};
