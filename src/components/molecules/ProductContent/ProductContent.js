import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../../atoms/Spinner/Spinner';
import Button from '../../atoms/Button/Button';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { addProductToCart } from '../../../actions/cartAction';
import { DeleteAcceptContext } from '../../../context/DeleteAcceptContext';
import DeleteAcceptBox from '../DeleteAcceptBox/DeleteAcceptBox';

const StyledContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const StyledTitle = styled(Paragraph)`
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 2rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 2rem 0;
`;

const ButtonWrapper = styled.div`
  display: ${({ isYourOwnProduct }) => (isYourOwnProduct ? 'none' : 'block')};
`;

const ProductContent = ({ singleProduct, loading, cart, userID, addProductToCart }) => {
  const isAlreadyInCart = cart.filter(item => item === singleProduct);
  const isYourOwnProduct = userID === singleProduct.userID;
  const { setBoxState, setProductId, setProductName } = useContext(DeleteAcceptContext);

  return (
    <>
      <StyledContentWrapper>
        {loading ? <Spinner /> : <StyledTitle>{singleProduct.name}</StyledTitle>}
        <StyledImage src={singleProduct.image} />
        <StyledParagraph medium>{singleProduct.description}</StyledParagraph>
        <StyledParagraph>{singleProduct.price}$</StyledParagraph>
        {isYourOwnProduct ? (
          <>
            <StyledParagraph>This is your product. You can remove this one</StyledParagraph>
            <Button
              text='remove product'
              onClick={() => {
                setBoxState(true);
                setProductId(singleProduct._id);
                setProductName(singleProduct.name);
              }}
            />
          </>
        ) : null}
        <ButtonWrapper isYourOwnProduct={isYourOwnProduct}>
          {isAlreadyInCart.length !== 0 ? (
            <Button text='You have this product in cart' />
          ) : (
            <Button text='add to cart' onClick={() => addProductToCart(singleProduct)} />
          )}
        </ButtonWrapper>
      </StyledContentWrapper>
      <DeleteAcceptBox />
    </>
  );
};

const mapStateToProps = ({
  productReducer: { singleProduct, loading },
  cartReducer: { cart },
  authenticationReducer: { userID }
}) => {
  return { singleProduct, loading, cart, userID };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: product => dispatch(addProductToCart(product))
  };
};

ProductContent.propTypes = {
  match: PropTypes.object,
  fetchSingleProduct: PropTypes.func,
  singleProduct: PropTypes.object,
  loading: PropTypes.bool,
  addProductToCart: PropTypes.func,
  cart: PropTypes.array,
  userID: PropTypes.string
};

const ProductContentWithRouter = withRouter(ProductContent);

export default connect(mapStateToProps, mapDispatchToProps)(ProductContentWithRouter);
