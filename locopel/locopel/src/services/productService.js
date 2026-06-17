const { Product } = require('../db'); 

exports.getAllProducts = async () => await Product.findAll();

exports.createProduct = async (data) => await Product.create(data);

exports.updateProduct = async (id, data) => {
  return await Product.update(data, { where: { id } });
};

exports.deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};

exports.getProductById = async (id) => {
  return await Product.findByPk(id);
};