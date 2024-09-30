// 请求参数解析
const FavoriteService = require("../../services/admin/FavoriteService");

const FavoriteController = {
  // 获取产品列表
  getList: async (req, res) => {
    const result = await FavoriteService.getList({
      user_id: req.currentUser._id,
    });
    res.send({
      msg: "OK",
      success: true,
      data: result,
    });
  },
  // 收藏作品
  favoriteOne: async (req, res) => {
    const result = await FavoriteService.favoriteOne({
      productId: req.body.id,
      userId: req.currentUser._id,
    });
    res.send({
      msg: "OK",
      success: true,
      data: result,
    });
  },
};

module.exports = FavoriteController;
