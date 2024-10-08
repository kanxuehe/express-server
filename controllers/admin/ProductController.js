// 请求参数解析
const ProductService = require("../../services/admin/ProductService");

const ProductController = {
  // 新增产品接口
  add: async (req, res) => {
    // console.log(req.file,req.body)
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    //调用 service进行添加
    await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      msg: "OK",
    });
  },
  // 编辑产品接口
  updateList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail, _id } = req.body;
    //调用 service进行添加
    await ProductService.updateList({
      _id,
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      msg: "OK",
    });
  },
  // 获取产品列表接口
  getList: async (req, res) => {
    const result = await ProductService.getList(req.currentUser._id);
    res.send({
      msg: "OK",
      success: true,
      data: result,
    });
  },
  // 删除产品接口
  delList: async (req, res) => {
    await ProductService.delList({ _id: req.params.id });
    res.send({
      msg: "OK",
    });
  },
  // 收藏作品
  favoriteOne: async (req, res) => {
    const result = await ProductService.favoriteOne({
      productId: req.params.id,
      userId: req.currentUser._id,
    });
    res.send({
      msg: "OK",
      success: true,
      data: result,
    });
  },
};

module.exports = ProductController;
