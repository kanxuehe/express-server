var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/UserRouter"); // [后台管理系统]用户相关接口
const NewsRouter = require("./routes/admin/NewsRouter"); // [后台管理系统]新闻相关接口
const ProductRouter = require("./routes/admin/ProductRouter"); // [后台管理系统]新闻相关接口
const FavoriteRouter = require("./routes/admin/FavoriteRouter"); // [后台管理系统]新闻相关接口

const webNewsRouter = require("./routes/web/NewsRouter"); // [企业门户网站]新闻相关接口
const webProductRouter = require("./routes/web/ProductRouter"); // [企业门户网站]产品相关接口
const jwt = require("./utils/jwt");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(webNewsRouter); // 4.[官网]新闻相关接口
app.use(webProductRouter); // 5.[官网]产品相关接口

/*
 /adminApi/* - 后台系统用的(需要中间件进行登录校验)
 /webapi/* - 企业官网用的(不需要登录校验)
*/

// 设置中间件验证token
app.use((req, res, next) => {
  if (["/adminApi/user/login", "/adminApi/user/add"].includes(req.url)) {
    next();
    return;
  }

  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    var userInfo = jwt.verify(token);
    if (!userInfo) {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
      return;
    }
    req.currentUser = userInfo;
    next();
  } else {
    res.status(401).send({ errCode: "-1", errorInfo: "未登录" });
  }
});

app.use(UserRouter); // 1.用户相关接口
app.use(NewsRouter); // 2.[后台]新闻相关接口
app.use(ProductRouter); // 3.产品相关接口
app.use(FavoriteRouter); // 3.产品相关接口

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
