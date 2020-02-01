import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../actions/productAction';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Spinner from '../components/atoms/Spinner/Spinner';
import Button from '../components/atoms/Button/Button';
import { addProductToCart } from '../actions/cartAction';

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

const ProductPage = ({
  match,
  fetchSingleProduct,
  singleProduct,
  loading,
  addProductToCart,
  cart
}) => {
  const isAlreadyInCart = cart.filter(item => item === singleProduct);
  useEffect(() => {
    fetchSingleProduct(match.params.id);
    console.log(match);
  }, []);

  return (
    <MainTemplate>
      <StyledContentWrapper>
        {loading ? <Spinner /> : <StyledTitle>{singleProduct.name}</StyledTitle>}
        <StyledImage src={singleProduct.image} />
        <StyledParagraph medium>{singleProduct.description}</StyledParagraph>
        <StyledParagraph>{singleProduct.price}$</StyledParagraph>
        {isAlreadyInCart.length !== 0 ? (
          <Button text='You have this product in cart' />
        ) : (
          <Button text='add to cart' onClick={() => addProductToCart(singleProduct)} />
        )}
      </StyledContentWrapper>
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { singleProduct, loading }, cartReducer: { cart } }) => {
  return { singleProduct, loading, cart };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addProductToCart: product => dispatch(addProductToCart(product))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  fetchSingleProduct: PropTypes.func,
  singleProduct: PropTypes.object,
  loading: PropTypes.bool,
  addProductToCart: PropTypes.func,
  cart: PropTypes.array
};

const ProductPageWithRouter = withRouter(ProductPage);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageWithRouter);
