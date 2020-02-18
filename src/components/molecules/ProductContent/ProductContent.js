import React, { useContext } from 'react';
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
import WarningInfo from '../../atoms/WarningInfo/WarningInfo';

const StyledContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
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

  ${({ theme }) => theme.mq.standard} {
    height: 75vh;
    width: 50%;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 2rem 0;
`;

const ButtonWrapper = styled.div`
  display: ${({ isYourOwnProduct }) => (isYourOwnProduct ? 'none' : 'block')};
`;

const ContentWrapper = styled.div`
  ${({ theme }) => theme.mq.standard} {
    width: 50%;
    margin-left: 5rem;
  }
`;

const ProductContent = ({ singleProduct, loading, cart, userID, addProductToCart }) => {
  const isAlreadyInCart =
    cart !== []
      ? cart.filter(item => item._id === singleProduct._id)
      : JSON.parse(localStorage.getItem('cart')).filter(item => item._id === singleProduct._id);

  const isYourOwnProduct = userID === singleProduct.userID;
  const { setBoxState, setProductId, setProductName } = useContext(DeleteAcceptContext);

  return (
    <>
      <StyledContentWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <StyledImage src={singleProduct.image} />
            <ContentWrapper>
              {isYourOwnProduct ? (
                <WarningInfo text='This is your product. You cannot add this product to cart' />
              ) : null}
              <StyledTitle>{singleProduct.name}</StyledTitle>
              <StyledParagraph medium>{singleProduct.description}</StyledParagraph>
              <StyledParagraph>{singleProduct.price}$</StyledParagraph>
              {isYourOwnProduct ? (
                <>
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
            </ContentWrapper>
          </>
        )}
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
