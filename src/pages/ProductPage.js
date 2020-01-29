import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../actions/productAction';

const ProductPage = ({ match, fetchSingleProduct, singleProduct, loading }) => {
  useEffect(() => {
    fetchSingleProduct(match.params.id);
  }, []);

  return (
    <div>
      <h1>hello product</h1>
      {loading ? <h1>Loading...</h1> : <h1>{singleProduct.name}</h1>}
    </div>
  );
};

const mapStateToProps = ({ productReducer: { singleProduct, loading } }) => {
  return { singleProduct, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  };
};

const ProductPageWithRouter = withRouter(ProductPage);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageWithRouter);
