import styled from 'styled-components';
import { Typography } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { TUniversityDetails } from '../../redux/modules/universities/types';
import { MouseEvent } from 'react';

const { Title, Text } = Typography;
export const StyledCard = styled.div`
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #ffffff;
  height: 300px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
  }
`;
export const CardHeader = styled.div`
  padding: 24px 24px 8px;
  height: 180px;
  background-color: #dbdde8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  position: relative;
`;
export const CardContent = styled.div`
  padding: 16px 16px 24px 24px;
`;
export const FavouriteWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const CardTitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StarWrapper = styled.span<{ isFavourite: boolean }>`
  font-size: 24px;
  color: ${({ isFavourite }) => (isFavourite ? `#ffce00` : `#dbdde8`)};

  &:hover {
    color: ${({ isFavourite }) => (isFavourite ? `#dbdde8` : `#ffce00`)};
  }
`;

interface TUniversityCardDetails {
  webPages: string;
  isFavourite?: boolean;
  onFavourite?: (name: string) => void;
}
export type TUniversityCardProps = Pick<TUniversityDetails, 'name' | 'country'> & TUniversityCardDetails;
export const UniversityCard = ({ name, country, webPages, isFavourite = false, onFavourite }: TUniversityCardProps) => {
  const handleCardClick = () => {
    window.open(webPages, '_blank');
  };

  const handleFavourite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof onFavourite === 'function') onFavourite(name);
  };

  const FavouriteStar = () => {
    return (
      <StarWrapper isFavourite={isFavourite} onClick={handleFavourite}>
        {isFavourite ? <StarFilled /> : <StarOutlined />}
      </StarWrapper>
    );
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardHeader></CardHeader>
      <CardContent>
        <CardTitleHeader>
          <Title level={5} ellipsis>
            {name}
          </Title>
          <FavouriteStar />
        </CardTitleHeader>
        <Text strong>{country}</Text>
        <br />
        <Text>{webPages}</Text>
      </CardContent>
    </StyledCard>
  );
};
