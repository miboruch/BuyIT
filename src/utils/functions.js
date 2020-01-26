export const isProductInLocalStorage = product => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart.map(item => product._id === item._id);
};
