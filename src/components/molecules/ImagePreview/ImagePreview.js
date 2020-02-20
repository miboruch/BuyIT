import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseButton from '../../atoms/CloseButton/CloseButton';

const StyledBackground = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: none;
  justify-content: center;
  align-items: center;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 999;
  transition: opacity 0.5s ease, visibility 0.5s ease;

  ${({ theme }) => theme.mq.desktop} {
    display: flex;
  }
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const StyledImage = styled.img`
  height: 98vh;
  object-fit: cover;
`;

const ImagePreview = ({ isOpen, imageUrl, toggle }) => {
  return (
    <StyledBackground isOpen={isOpen}>
      <CloseButtonWrapper>
        <CloseButton setBoxState={toggle} buttonTheme='light' />
      </CloseButtonWrapper>
      <StyledImage src={imageUrl} />
    </StyledBackground>
  );
};

ImagePreview.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
};

export default ImagePreview;
