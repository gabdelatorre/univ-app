import { Input, Divider } from 'antd';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Button } from '..';
import { TGetUniversitiesType } from '../../redux/modules/universities/types';

const SearchWrapper = styled.div`
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  border-radius: 6px;
  align-items: center;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(Input)`
  border: 0;
  outline: none;

  &:focus {
    box-shadow: none;
  }
`;

export const SearchBar = ({ onSearch }: { onSearch: (search: TGetUniversitiesType) => void }) => {
  const [searchUniv, setSearchUniv] = useState('');
  const [searchCtry, setSearchCtry] = useState('');

  const handleUnivChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUniv(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCtry(e.target.value);
  };

  const handleSearchBtn = () => {
    if (!searchUniv && !searchCtry) return;
    onSearch({
      name: searchUniv,
      country: searchCtry,
    });
  };

  return (
    <SearchWrapper>
      <StyledInput size='large' value={searchUniv} placeholder='University name' onChange={handleUnivChange} />
      <Divider type='vertical' />
      <StyledInput size='large' value={searchCtry} placeholder='Country' onChange={handleCountryChange} />
      <Button data-testid='search-btn' size='large' onClick={handleSearchBtn}>
        {' '}
        Search{' '}
      </Button>
    </SearchWrapper>
  );
};
