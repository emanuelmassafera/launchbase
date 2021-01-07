const { addOne } = require('../../lib/cart');
const Cart = require('../../lib/cart');
const LoadProductsServices = require('../service/LoadProductService');

module.exports = {
  async index(req, res) {
    try {
      let { cart } = req.session;

      cart = Cart.init(cart);

      return res.render('cart/index', { cart });
    } catch (error) {
      console.error(error);
    }
  },

  async addOne(req, res) {
    // Pegar o id do produto e o produto
    const { id } = req.params;

    const product = await LoadProductsServices.load('product', {
      where: { id },
    });

    //Pegar o carrinho da sessão
    let { cart } = req.session;

    // Adicionar o produto ao carrinho
    cart = Cart.init(cart).addOne(product);

    // Atualizar o carrinho da sessão
    req.session.cart = cart;

    return res.redirect('/cart');
  },
};
