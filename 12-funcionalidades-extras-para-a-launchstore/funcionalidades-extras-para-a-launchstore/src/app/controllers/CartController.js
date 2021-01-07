const { addOne, removeOne } = require('../../lib/cart');
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

  removeOne(req, res) {
    // Pegar o id do produto
    let { id } = req.params;

    // Pegar o carrinho da sessão
    let { cart } = req.session;

    // Se não tiver carrinho, retornar
    if (!cart) return res.redirect('/cart');

    // Iniciar o carrinho e remover
    cart = Cart.init(cart).removeOne(id);

    // Atualizar o carrinho da sessão, removendo o item
    req.session.cart = cart;

    // Redirecionamento para a página cart
    return res.redirect('/cart');
  },

  delete(req, res) {
    let { id } = req.params;

    let { cart } = req.session;

    if (!cart) return res.redirect('/cart');

    cart = Cart.init(cart).delete(id);

    req.session.cart = cart;

    return res.redirect('/cart');
  },
};
