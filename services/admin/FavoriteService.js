// 操作数据库
const ProductModel = require("../../models/ProductModel");
const FavoriteModel = require("../../models/FavoriteModel");
const FavoriteService = {
  // 获取产品列表
  getList: async ({ user_id }) => {
    return FavoriteModel.find({ user: user_id });
  },
  favoriteOne: async ({ productId, userId }) => {
    return FavoriteModel.create({
      user: userId,
      product: productId,
    });
  },
};

module.exports = FavoriteService;
