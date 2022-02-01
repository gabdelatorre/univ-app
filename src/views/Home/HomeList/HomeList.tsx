import { Typography, Row, Col, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { EmptyCard, LoadingCard, UniversityCard } from '../../../components';
import { changeAppView } from '../../../redux/modules/universities/actions';
import { AppContentView, TUniversityDetails } from '../../../redux/modules/universities/types';
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useTypedSelector } from '../../../utils/useTypedSelector';
import { HOME_PAGE_SIZE } from '../constants';
import { useHomeContext } from '../HomeProvider';
import { ContentHeader, ContentSection, PaginationWrapper } from '../styles';

const { Title, Link } = Typography;

export const HomeList = () => {
  const { userData, handleFavourite } = useHomeContext();
  const dispatch = useAppDispatch();
  const isLoading = useTypedSelector((state) => state.universities.isLoading);
  const universitySelector = useTypedSelector((state) => state.universities.universities);
  const countryCodeSelector = useTypedSelector((state) => state.universities.currentCountry);
  const [universities, setUniversities] = useState<TUniversityDetails[]>([]);
  const [currentPage, setPage] = useState(1);
  const { favourites: userFavourites = [] } = userData;

  useEffect(() => {
    const startIdx = (currentPage - 1) * HOME_PAGE_SIZE;
    const slicedUniversities = universitySelector.slice(startIdx, startIdx + HOME_PAGE_SIZE);
    setUniversities(slicedUniversities);
  }, [universitySelector, currentPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleViewMoreClick = () => {
    dispatch(changeAppView(AppContentView.Favourites));
  };

  const renderFavouriteCards = () => {
    if (isLoading) {
      return <LoadingCard />;
    }

    if (universitySelector.length === 0 || userFavourites.length === 0) {
      return (
        <EmptyCard
          primaryMessage='No favourites yet'
          secondaryMessage="You don't have favourites yet. You can favourite a university by clicking the star icon."
        />
      );
    }

    return (
      <Row gutter={16}>
        {universitySelector
          .filter((uni) => userFavourites.includes(uni.name))
          .slice(0, 4)
          .map((university) => (
            <Col xs={24} sm={12} xl={6} lg={8} key={`${university.name}-${university.domains[0]}`}>
              <UniversityCard
                name={university.name}
                country={university.country}
                webPages={university.web_pages[0]}
                isFavourite={userFavourites.includes(university.name)}
                onFavourite={handleFavourite}
              />
            </Col>
          ))}
      </Row>
    );
  };

  const renderFavouriteSection = () => {
    return (
      <ContentSection>
        <ContentHeader>
          <Title level={2}> My Favourites </Title>
          <Link style={{ margin: '0' }} disabled={userFavourites.length === 0} onClick={handleViewMoreClick}>
            {' '}
            View more{' '}
          </Link>
        </ContentHeader>
        {renderFavouriteCards()}
      </ContentSection>
    );
  };

  const renderCurrentLocationCards = () => {
    if (isLoading) {
      return <LoadingCard />;
    }

    if (universities.length === 0) {
      return (
        <EmptyCard
          primaryMessage='No data found'
          secondaryMessage="We weren't able to retrieve any universities at this time. Please try again later."
        />
      );
    }

    return (
      <Row gutter={16}>
        {universities.map((university) => (
          <Col xs={24} sm={12} xl={6} lg={8} key={`${university.name}-${university.domains[0]}`}>
            <UniversityCard
              name={university.name}
              country={university.country}
              webPages={university.web_pages[0]}
              isFavourite={userFavourites.includes(university.name)}
              onFavourite={handleFavourite}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderCurrentLocationSection = () => {
    return (
      <ContentSection>
        <ContentHeader>
          <Title level={2}>
            {' '}
            {countryCodeSelector ? `Universities in ${countryCodeSelector}` : 'Universities Near You'}{' '}
          </Title>
        </ContentHeader>
        {renderCurrentLocationCards()}
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            pageSize={HOME_PAGE_SIZE}
            total={universitySelector.length}
          />
        </PaginationWrapper>
      </ContentSection>
    );
  };

  return (
    <>
      {renderFavouriteSection()}
      {renderCurrentLocationSection()}
    </>
  );
};
