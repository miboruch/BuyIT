import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../Paragraph/Paragraph';
import { orderSuccessFinish } from '../../../actions/orderAction';

const StyledBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '-100%')});
  transition: transform 0.5s ease;
`;

const StyledParagraph = styled(Paragraph)`
  color: #000;
  font-size: 15px;
`;

const DialogBox = ({ orderSuccess, hideDialogBox }) => {
  if (orderSuccess) {
    window.setTimeout(() => {
      hideDialogBox();
    }, 3000);
  }
  return (
    <StyledBox isVisible={orderSuccess}>
      <StyledParagraph>Order has been completed successfully</StyledParagraph>
    </StyledBox>
  );
};

const mapStateToProps = ({ orderReducer: { orderSuccess } }) => {
  return { orderSuccess };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDialogBox: () => dispatch(orderSuccessFinish())
  };
};

DialogBox.propTypes = {
  orderSuccess: PropTypes.bool,
  hideDialogBox: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);
