const mongoose = require("mongoose");

const FavoriteType = {
  user_id: String,
  product_id: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
};
const Schema = new mongoose.Schema(FavoriteType, { timestamps: true });

// 创建数据库模型
const FavoriteModel = mongoose.model("favorite", Schema);

module.exports = FavoriteModel;
