// 产品接口
const express = require("express");
const ProductController = require("../../controllers/admin/ProductController");
const ProductRouter = express.Router();

const multer = require("multer");
const upload = multer({ dest: "public/productuploads/" });

// 涉及文件上传, 普通post不行, 需要加上 multer中间件
// 新增产品
ProductRouter.post(
  "/adminApi/product/add",
  upload.single("file"),
  ProductController.add
);
// 获取产品列表
ProductRouter.get("/adminApi/product/list", ProductController.getList);
// 编辑产品(编辑)
ProductRouter.post(
  "/adminApi/product/list",
  upload.single("file"),
  ProductController.updateList
);
// 获取对应的产品(编辑)
ProductRouter.get("/adminApi/product/list/:id", ProductController.getList);
// 删除产品
ProductRouter.delete("/adminApi/product/list/:id", ProductController.delList);
// 收藏产品
ProductRouter.get(
  "/adminApi/product/favorite/:id",
  ProductController.favoriteOne
);

module.exports = ProductRouter;
