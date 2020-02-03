import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../actions/productAction';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import Spinner from '../components/atoms/Spinner/Spinner';
import { addProductToCart } from '../actions/cartAction';
import DeleteAcceptContextProvider from '../context/DeleteAcceptContext';
import ProductContent from '../components/molecules/ProductContent/ProductContent';

const ProductPage = ({ match, fetchSingleProduct, loading }) => {
  useEffect(() => {
    fetchSingleProduct(match.params.id);
  }, []);

  return (
    <MainTemplate>
      <DeleteAcceptContextProvider>
        {loading ? <Spinner /> : <ProductContent />}
      </DeleteAcceptContextProvider>
    </MainTemplate>
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addProductToCart: product => dispatch(addProductToCart(product))
  };
};

ProductPage.propTypes = {
  match: PropTypes.object,
  fetchSingleProduct: PropTypes.func,
  loading: PropTypes.bool
};

const ProductPageWithRouter = withRouter(ProductPage);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageWithRouter);
