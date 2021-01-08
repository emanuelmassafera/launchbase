const LoadProductService = require('../service/LoadProductService');
const User = require('../models/User');
const Order = require('../models/Order');

const mailer = require('../../lib/mailer');
const Cart = require('../../lib/cart');
const { formatPrice, date } = require('../../lib/utils');

const email = (seller, product, buyer) => `
<h2>Olá, ${seller.name}</h2>
<p>Você tem um novo pedido de compra do seu produto.</p>
<p>Produto: ${product.name}</p>
<p>Preço: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador</h3>
<p>${buyer.name}</p>
<p>${buyer.email}</p>
<p>${buyer.address}</p>
<p>${buyer.cep}</p>
<p><br/><br/></p>
<p><strong>Entre em contato com o comprado para finalizar a venda!</strong></p>
<p><br/><br/></p>
<p>Atenciosamente, equipe Launchstore</p>
`;

module.exports = {
  async index(req, res) {
    // Pegar os pedidos do usuário
    let orders = await Order.findAll({
      where: { buyer_id: req.session.userId },
    });

    const ordersPromise = orders.map(async (order) => {
      // Detalhes do produto
      order.product = await LoadProductService.load('product', {
        where: { id: order.product_id },
      });

      // Detalhes do comprador
      order.buyer = await User.findOne({
        where: { id: order.buyer_id },
      });

      // Detalhes do vendedor
      order.seller = await User.findOne({
        where: { id: order.seller_id },
      });

      // Formatação de preço
      order.formattedPrice = formatPrice(order.price);
      order.formattedTotal = formatPrice(order.total);

      // Formatação do status
      const status = {
        open: 'Aberto',
        sold: 'Vendido',
        canceled: 'Cancelado',
      };

      order.formattedStatus = status[order.status];

      // Formatação de atualizado
      const updatedAt = date(order.updated_at);

      order.formattedUpdatedAt = `${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ${updatedAt.hour}h${updatedAt.minutes}`;

      return order;
    });

    orders = await Promise.all(ordersPromise);

    return res.render('orders/index', { orders });
  },

  async post(req, res) {
    try {
      // Pegar os produtos do carrinho
      const cart = Cart.init(req.session.cart);

      const buyer_id = req.session.userId;

      const filteredItems = cart.items.filter(
        (item) => item.product.user_id != buyer_id
      );

      // Criar pedido
      const createOrdersPromise = filteredItems.map(async (item) => {
        let { product, price: total, quantity } = item;
        const { price, id: product_id, user_id: seller_id } = product;
        const status = 'open';

        const order = await Order.create({
          seller_id,
          buyer_id,
          product_id,
          price,
          total,
          quantity,
          status,
        });

        product = await LoadProductService.load('product', {
          where: { id: product_id },
        });

        const seller = await User.findOne({ where: { id: seller_id } });

        const buyer = await User.findOne({ where: { id: buyer_id } });

        await mailer.sendMail({
          to: seller.email,
          from: 'no-reply@launchstore.com.br',
          subject: 'Novo pedido de compra',
          html: email(seller, product, buyer),
        });

        return order;
      });

      await Promise.all(createOrdersPromise);

      // Limpar o carrinho
      delete req.session.cart;
      Cart.init();

      return res.render('orders/success');
    } catch (error) {
      console.error(error);
      return res.render('orders/error');
    }
  },
};
