const UserService = require("../../services/admin/UserService");
const jwt = require("../../utils/jwt");

const UserController = {
  login: async (req, res) => {
    var result = await UserService.login(req.body);

    // 登录校验
    if (result.length === 0) {
      res.send({
        code: "-1", //返回信息
        error: "用户名密码不匹配",
      });
    } else {
      const token = jwt.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "24h"
      );
      const userInfo = JSON.parse(JSON.stringify(result[0]));
      delete userInfo.password;
      res.send({
        msg: "OK",
        success: true,
        data: {
          ...userInfo,
          token,
        },
      });
    }
  },

  // 更新用户数据接口(自己)
  upload: async (req, res) => {
    console.log("接收的到的用户修改数据:", req.body, req.file);
    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    var payload = jwt.verify(token);
    // console.log(payload._id)
    //调用service 模块更新 数据

    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    if (avatar) {
      res.send({
        msg: "OK",
        success: true,
        data: {
          username,
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        msg: "OK",
        success: true,
        data: {
          username,
          introduction,
          gender: Number(gender),
        },
      });
    }
  },

  // 添加用户接口
  add: async (req, res) => {
    // console.log(req.body,req.file)
    const { username, introduction, gender, role, password } = req.body; // 解析请求体数据
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""; // 保存头像数据名
    await UserService.add({
      username,
      introduction,
      gender: Number(gender),
      avatar,
      role: Number(role),
      password,
    });
    res.send({
      msg: "OK",
      success: true,
    });
  },

  // 获取用户列表数据
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      msg: "OK",
      success: true,
      data: result,
    });
  },

  // 删除用户数据
  delList: async (req, res) => {
    // console.log('要删除的用户id',req.params.id)
    const result = await UserService.delList({ _id: req.params.id });
    res.send({
      msg: "OK",
      success: true,
    });
  },

  // 修改用户数据(用户列表)
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);
    res.send({
      msg: "OK",
      success: true,
    });
  },
};

module.exports = UserController;
