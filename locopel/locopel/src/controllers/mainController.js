const { Product } = require('../../src/db'); 

exports.home = async (req, res) => {
  res.render("index");
};

exports.extensions = async (req, res) => {
  res.render("extensions");
};

exports.education = async (req, res) => {
  res.render("education");
};

exports.products = async (req, res) => {
  const products = await Product.findAll();
  res.render("products", { products });
};
