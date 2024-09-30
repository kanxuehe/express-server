var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })// 数据纯在服务器,地址存在数据库


/* GET home page. */
UserRouter.post("/adminApi/user/login",UserController.login)//登录接口
UserRouter.post("/adminApi/user/upload",upload.single('file'),UserController.upload)// 修改用户信息接口
UserRouter.post("/adminApi/user/add",upload.single('file'),UserController.add)// 添加用户接口
UserRouter.get("/adminApi/user/list",UserController.getList)// 获取用户数据接口(用户列表)
UserRouter.get("/adminApi/user/list/:id",UserController.getList)// 获取用户数据接口(单一用户,编辑用户)
UserRouter.put("/adminApi/user/list/:id",UserController.putList)// 修改用户数据接口(单一用户,编辑用户)
UserRouter.delete("/adminApi/user/list/:id",UserController.delList)// 删除用户数据接口(动态路由形式)


module.exports = UserRouter;
