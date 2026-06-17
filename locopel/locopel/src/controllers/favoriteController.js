const { Favorite } = require('../db');

exports.toggleFavorite = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  const userId = req.session.user.id; 
  const productId = req.body.productId;

  console.log("DEBUG: userId:", userId, "productId:", productId);

  const fav = await Favorite.findOne({ where: { userId: userId, productId: productId } });

  if (fav) {
    await fav.destroy();
  } else {
    await Favorite.create({ UserId: userId, ProductId: productId });
  }
  res.redirect("/products");
};