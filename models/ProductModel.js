// 产品表
const mongoose = require("mongoose");
// product模型===>products集合

const ProductType = {
  title: String,
  introduction: String, // 简介
  detail: String, // 详情
  cover: String, //封面
  editTime: Date,
};
const Schema = new mongoose.Schema(ProductType, { timestamps: true });

// 创建数据库模型
const ProductModel = mongoose.model("product", Schema);

module.exports = ProductModel;
