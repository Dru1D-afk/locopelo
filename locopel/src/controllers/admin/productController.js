const productService = require("../../services/productService");

exports.getProductsPage = async (req, res) => {
  const products = await productService.getAllProducts();
  res.render("admin/products", { products });
};

exports.deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.redirect("/admin/products");
};

exports.addProduct = async (req, res) => {
  const data = { ...req.body, imageUrl: req.file ? '/images/products/' + req.file.filename : null };
  await productService.createProduct(data);
  res.redirect("/admin/products");
};

// метод для получения товара под редактирование
exports.getEditPage = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.render("admin/edit-product", { product });
};

// метод сохранения изменений
exports.updateProduct = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.imageUrl = '/images/products/' + req.file.filename;
  await productService.updateProduct(req.params.id, data);
  res.redirect("/admin/products");
};