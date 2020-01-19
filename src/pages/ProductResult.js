import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductResultTemplate from '../components/templates/ProductResultTemplate/ProductResultTemplate';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import SingleProductCart from '../components/molecules/SingleProductCart/SingleProductCart';
import Spinner from '../components/atoms/Spinner/Spinner';
import { useTrail } from 'react-spring';

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
`;

const ProductResult = ({ products, loading }) => {
  const productsTrail = useTrail(products.length, {
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 700
  });

  return (
    <MainTemplate search>
      {loading ? (
        <Spinner />
      ) : (
        <ProductResultTemplate>
          <ProductWrapper>
            {productsTrail.map((props, index) => (
              <SingleProductCart
                style={props}
                name={products[index].name}
                image={products[index].image}
                id={products[index]._id}
                price={products[index].price}
                userLogin={products[index].userLogin}
                productUserID={products[index].userID}
                key={products[index]._id}
              />
            ))}

            {/*{products.map(item => (*/}
            {/*  <SingleProductCart*/}
            {/*    name={item.name}*/}
            {/*    image={item.image}*/}
            {/*    id={item._id}*/}
            {/*    price={item.price}*/}
            {/*    userLogin={item.userLogin}*/}
            {/*    key={item._id}*/}
            {/*  />*/}
            {/*))}*/}
          </ProductWrapper>
        </ProductResultTemplate>
      )}
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { products, loading } }) => {
  return { products, loading };
};

ProductResult.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(ProductResult);
