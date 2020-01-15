import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import { SearchContext } from '../../../context/SearchContext';

const StyledSearchWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.backgroundLight};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.5s ease-in-out;
  z-index: 900;
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 2rem;
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  font-weight: lighter;
  font-size: 40px;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 250px;
  height: 40px;
  background: transparent;
  border: 1px solid #1d1d1d;
  font-size: 18px;
  font-family: ${({ theme }) => theme.font.family.futura};

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 4rem;
`;

const Search = () => {
  const { isSearchOpen } = useContext(SearchContext);
  return (
    <StyledSearchWrapper isOpen={isSearchOpen}>
      <StyledContentWrapper>
        <StyledHeading>search</StyledHeading>
        <StyledInput />
        <ButtonWrapper>
          <Button text='Search' buttonTheme='dark' />
        </ButtonWrapper>
      </StyledContentWrapper>
    </StyledSearchWrapper>
  );
};

export default Search;
