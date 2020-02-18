import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import warningIcon from '../../../assets/icons/warning.svg';
import Paragraph from '../Paragraph/Paragraph';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
`;

const StyledIcon = styled(ReactSVG)`
  width: 30px;
  height: 30px;
  fill: #fff;
`;

const StyledParagraph = styled(Paragraph)`
  color: #fff;
  margin-left: 1rem;
  font-size: 12px;
`;

const WarningInfo = ({ text }) => {
  return (
    <StyledWrapper>
      <StyledIcon src={warningIcon} />
      <StyledParagraph>{text}</StyledParagraph>
    </StyledWrapper>
  );
};

WarningInfo.propTypes = {
  text: PropTypes.string.isRequired
};

export default WarningInfo;
