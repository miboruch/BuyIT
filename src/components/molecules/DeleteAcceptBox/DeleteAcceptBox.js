import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { removeProduct } from '../../../actions/productAction';
import { DeleteAcceptContext } from '../../../context/DeleteAcceptContext';

const StyledBoxWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  justify-content: center;
  align-items: center;
  z-index: 150;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.5s ease;
  display: flex;

  ${({ theme }) => theme.mq.tablet} {
    display: flex;
  }
`;

const StyledBox = styled.div`
  width: 90%;
  height: 250px;
  background: #fff;
  outline: 2px solid #0b1010;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mq.standard} {
    width: 500px;
    height: 300px;
  }
`;

const LeftBoxSide = styled.section`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const RightBoxSide = styled(LeftBoxSide)`
  left: 50%;
`;

const StyledTitle = styled(Paragraph)`
  pointer-events: none;
`;

const StyledLine = styled.div`
  width: 1px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 50%;
`;

const StyledBoxParagraph = styled(Paragraph)`
  width: 80%;
  text-align: center;
  color: #1d1d1d;
  z-index: 400;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 500;
`;

const DeleteAcceptBox = ({ token, removeProduct }) => {
  const { isBoxOpen, setBoxState, productId, productName } = useContext(DeleteAcceptContext);

  return (
    <StyledBoxWrapper isOpen={isBoxOpen}>
      <StyledBox>
        <CloseButtonWrapper>
          <CloseButton setBoxState={setBoxState} />
        </CloseButtonWrapper>
        <StyledBoxParagraph>
          Are you sure you want to delete <strong>{productName}</strong> from database?
        </StyledBoxParagraph>
        <LeftBoxSide
          onClick={() => {
            removeProduct(token, productId);
            setBoxState(false);
          }}
        >
          <StyledTitle title>YES</StyledTitle>
        </LeftBoxSide>
        <RightBoxSide onClick={() => setBoxState(false)}>
          <StyledTitle title>NO</StyledTitle>
        </RightBoxSide>
        <StyledLine />
      </StyledBox>
    </StyledBoxWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { token } }) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: (token, productID) => dispatch(removeProduct(token, productID))
  };
};

DeleteAcceptContext.propTypes = {
  token: PropTypes.string,
  removeProduct: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAcceptBox);
