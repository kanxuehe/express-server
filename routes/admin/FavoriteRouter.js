const express = require("express");
const FavoriteController = require("../../controllers/admin/FavoriteController");
const FavoriteRouter = express.Router();

// 收藏产品
FavoriteRouter.post("/adminApi/favorite", FavoriteController.favoriteOne);
FavoriteRouter.get("/adminApi/favorite/list", FavoriteController.getList);

module.exports = FavoriteRouter;
