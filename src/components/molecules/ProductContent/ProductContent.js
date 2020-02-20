import React, { useContext, useState } from 'react';
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
import Footer from '../Footer/Footer';
import ImagePreview from '../ImagePreview/ImagePreview';

const StyledContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  position: relative;

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
  margin: 2rem 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  cursor: pointer;

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

const FooterWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ProductContent = ({ singleProduct, loading, cart, userID, addProductToCart }) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
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
            <StyledImage src={singleProduct.image} onClick={() => setPreviewOpen(true)} />
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
        <FooterWrapper>
          <Footer footerTheme='light' />
        </FooterWrapper>
      </StyledContentWrapper>
      <DeleteAcceptBox />
      <ImagePreview isOpen={isPreviewOpen} imageUrl={singleProduct.image} toggle={setPreviewOpen} />
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
