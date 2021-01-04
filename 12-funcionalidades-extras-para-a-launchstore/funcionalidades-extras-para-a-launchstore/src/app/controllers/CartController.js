const Cart = require('../../lib/cart');
const LoadProductsServices = require('../service/LoadProductService');

module.exports = {
  async index(req, res) {
    try {
      const product = await LoadProductsServices.load('product', {
        where: { id: 3 },
      });
      let { cart } = req.session;

      cart = Cart.init(cart).addOne(product);

      return res.render('cart/index', { cart });
    } catch (error) {
      console.error(error);
    }
  },
};
