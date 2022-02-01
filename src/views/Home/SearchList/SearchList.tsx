import { Typography, Row, Col, Pagination, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { EmptyCard, LoadingCard, UniversityCard } from '../../../components';
import { TUniversityDetails } from '../../../redux/modules/universities/types';
import { useTypedSelector } from '../../../utils/useTypedSelector';
import { HOME_PAGE_SIZE } from '../constants';
import { ContentSection, ContentHeader, PaginationWrapper, ContentTitle, BackButton } from '../styles';
import { AppContentView } from '../../../redux/modules/universities/types';
import { changeAppView, getLocation, resetUniversities } from '../../../redux/modules/universities/actions';
import { useAppDispatch } from '../../../utils/useAppDispatch';
import { useHomeContext } from '../HomeProvider';

const { Title } = Typography;

export const SearchList = () => {
  const { userData, handleFavourite } = useHomeContext();
  const isLoading = useTypedSelector((state) => state.universities.isLoading);
  const universitySelector = useTypedSelector((state) => state.universities.universities);
  const [universities, setUniversities] = useState<TUniversityDetails[]>([]);
  const [currentPage, setPage] = useState(1);
  const [currentSort, setSort] = useState('name');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startIdx = (currentPage - 1) * HOME_PAGE_SIZE;
    const sortedUniversities = universitySelector.slice();
    sortedUniversities.sort((a, b) =>
      (a as unknown as Record<string, string>)[currentSort] > (b as unknown as Record<string, string>)[currentSort]
        ? 1
        : -1
    );
    const slicedUniversities = sortedUniversities.slice(startIdx, startIdx + HOME_PAGE_SIZE);
    setUniversities(slicedUniversities);
  }, [universitySelector, currentPage, currentSort]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleBackToHome = () => {
    dispatch(resetUniversities());
    dispatch(getLocation());
    dispatch(changeAppView(AppContentView.Home));
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const renderHeader = () => {
    return (
      <ContentHeader>
        <ContentTitle>
          <BackButton onClick={handleBackToHome}>
            <ArrowLeftOutlined />
          </BackButton>
          <Title level={2} style={{ margin: '0' }}>
            {' '}
            {`Search Results ${!isLoading ? `(${universitySelector.length})` : ``}`}{' '}
          </Title>
        </ContentTitle>
        <ContentTitle>
          <Title level={5} style={{ margin: '0' }}>
            {' '}
            Sort by{' '}
          </Title>
          <Select defaultValue={currentSort} style={{ width: 120 }} onChange={handleSortChange}>
            <Select.Option value='name'>Name</Select.Option>
            <Select.Option value='country'>Country</Select.Option>
          </Select>
        </ContentTitle>
      </ContentHeader>
    );
  };

  const renderCards = () => {
    if (isLoading) {
      return <LoadingCard />;
    }

    if (universities.length === 0) {
      return (
        <EmptyCard
          primaryMessage='No data found'
          secondaryMessage="We weren't able to retrieve any universities matching your search."
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
              isFavourite={userData.favourites?.includes(university.name)}
              onFavourite={handleFavourite}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderPagination = () => {
    return (
      <PaginationWrapper>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          pageSize={HOME_PAGE_SIZE}
          total={universitySelector.length}
        />
      </PaginationWrapper>
    );
  };

  return (
    <ContentSection>
      {renderHeader()}
      {renderCards()}
      {renderPagination()}
    </ContentSection>
  );
};
