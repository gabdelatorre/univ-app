import { useTypedSelector } from '../../utils/useTypedSelector';
import { useEffect } from 'react';
import {
  getLocation,
  getUniversities,
  changeAppView,
  resetUniversities,
} from '../../redux/modules/universities/actions';
import { Layout, Typography, Space, Divider } from 'antd';
import { HomeList } from './HomeList/HomeList';
import { SearchList } from './SearchList/SearchList';
import { useAuthContext } from '../AuthProvider';
import {
  StyledHeader,
  StyledFooter,
  StyledContent,
  Banner,
  SearchBarContainer,
  HeaderTitle,
  SubscriptionBanner,
  SubscriptionSection,
} from './styles';
import { SearchBar, Button } from '../../components';
import { TGetUniversitiesType, AppContentView } from '../../redux/modules/universities/types';
import { FavouriteList } from './FavouriteList/FavouriteList';
import { useAppDispatch } from '../../utils/useAppDispatch';
import { logoutUser, updateUserSubscription } from '../../redux/modules/firebase/actions';
import { HomeProvider, useHomeContext } from './HomeProvider';

const { Link, Text, Title } = Typography;

export const HomeContainer = () => {
  const { auth } = useAuthContext();
  const dispatch = useAppDispatch();
  const appView = useTypedSelector((state) => state.universities.appView);
  const { userData } = useHomeContext();
  const { isSubscribed: isUserSubscribed } = userData;

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSearch = (search: TGetUniversitiesType) => {
    const { name, country } = search;
    dispatch(resetUniversities());
    dispatch(changeAppView(AppContentView.Search));
    dispatch(getUniversities({ name, country }));
  };

  const handleSubscribe = () => {
    dispatch(updateUserSubscription({ isSubscribed: !isUserSubscribed }));
  };

  const renderHeader = () => {
    return (
      <StyledHeader>
        <HeaderTitle level={2}>
          {' '}
          <span style={{ color: '#192fa9' }}>Uni</span>Search{' '}
        </HeaderTitle>
        <Space direction='horizontal' size={16} align='center'>
          <Text> {auth.email} </Text>
          <Divider type='vertical' />
          <Link onClick={handleLogout}> Logout </Link>
        </Space>
      </StyledHeader>
    );
  };

  const renderContent = () => {
    switch (appView) {
      case AppContentView.Search:
        return <SearchList />;
      case AppContentView.Favourites:
        return <FavouriteList />;
      case AppContentView.Home:
      default:
        return <HomeList />;
    }
  };

  const renderContentArea = () => {
    return (
      <StyledContent>
        <Banner>
          <SearchBarContainer>
            <SearchBar onSearch={handleSearch} />
          </SearchBarContainer>
        </Banner>
        {renderContent()}
      </StyledContent>
    );
  };

  const renderSubscriptionSection = () => {
    return (
      <SubscriptionSection>
        <SubscriptionBanner>
          <div>
            <Title level={3}> Stay tuned! </Title>
            <Text> Subscribe to our newsletters, and never miss out on universities that might interest you. </Text>
          </div>
          <Button data-testid='subscribe-btn' size='large' onClick={handleSubscribe} style={{ width: 150 }}>
            {isUserSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </SubscriptionBanner>
      </SubscriptionSection>
    );
  };

  return (
    <Layout>
      {renderHeader()}
      {renderContentArea()}
      {renderSubscriptionSection()}
      <StyledFooter>© 2022 Gabriel Dela Torre</StyledFooter>
    </Layout>
  );
};

export const HomeView = () => {
  return (
    <HomeProvider>
      <HomeContainer />
    </HomeProvider>
  );
};
