const jsonwebtoken = require("jsonwebtoken");
const secret = "lam"; //解密密钥
const jwt = {
  // 生成tokne
  generate(value, expiresIn) {
    // 加密信息,过期时间
    return jsonwebtoken.sign(value, secret, { expiresIn });
  },
  // 验证token
  verify(token) {
    // 判断token
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (e) {
      return false;
    }
  },
};

module.exports = jwt;
