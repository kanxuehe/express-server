// 操作数据库
const mongoose = require("mongoose");
const ProductModel = require("../../models/ProductModel");
const ProductService = {
  // 新增产品
  add: async ({ title, introduction, detail, cover, editTime }) => {
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      editTime,
    });
  },

  // 编辑产品
  updateList: async ({ title, introduction, detail, _id, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne(
        { _id },
        {
          title,
          introduction,
          detail,
          cover,
          editTime,
        }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        {
          title,
          introduction,
          detail,
          editTime,
        }
      );
    }
  },

  // 获取产品列表
  getList: async (userId) => {
    return await ProductModel.aggregate([
      {
        $lookup: {
          from: "favorites",
          localField: "_id",
          foreignField: "product",
          as: "favorites",
        },
      },
      {
        $addFields: {
          isFavorited: {
            $size: {
              $filter: {
                input: "$favorites",
                as: "favorite",
                cond: {
                  $eq: ["$$favorite.user", mongoose.Types.ObjectId(userId)],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          favorites: 0, // 不返回 `favorites` 字段
        },
      },
    ]);
    // return _id ? ProductModel.find({ _id }) : ProductModel.find({});
  },

  // 删除产品
  delList: async ({ _id }) => {
    return ProductModel.deleteOne({
      _id,
    });
  },

  // publish:async ({_id,isPublish,editTime})=>{
  //     return NewsModel.updateOne({
  //         _id
  //     },{
  //         isPublish,
  //         editTime
  //     })
  // }
};

module.exports = ProductService;
