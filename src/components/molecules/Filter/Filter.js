import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../../context/FilterContext';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f1f1f1;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 1s ease;
  z-index: 1050 !important;
  display: flex;
  align-items: center;
  padding-left: 2rem;

  ${({ theme }) => theme.mq.standard} {
    width: 35%;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  padding-bottom: 1rem;
  font-weight: lighter;
  font-size: 40px;
  color: #1d1d1d;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 500;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledParagraphTitle = styled(Paragraph)`
  color: #1d1d1d;
  font-family: ${({ theme }) => theme.font.family.avanti};
  letter-spacing: 2px;
`;

const Filter = () => {
  const { isFilterOpen, setFilterState } = useContext(FilterContext);

  return (
    <StyledWrapper isOpen={isFilterOpen}>
      <CloseButtonWrapper>
        <CloseButton setBoxState={setFilterState} />
      </CloseButtonWrapper>
      <ContentWrapper>
        <StyledHeading>Filter</StyledHeading>
        <StyledParagraphTitle medium>Category:</StyledParagraphTitle>
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default Filter;
