const mongoose = require("mongoose");

const UserType = {
  username: String,
  password: String,
  email: String,
  avatar: String,
  gender: Number, // 性别 ,0[保密],1[男],2[女]
  role: Number, // 管理员1 ,编辑2
};
const Schema = new mongoose.Schema(UserType, { timestamps: true });

// 创建数据库模型
const UserModel = mongoose.model("user", Schema);

module.exports = UserModel;
