let express = require("express");
let config = require("./config/index");

let port = process.env.PORT || config.build.port;

let app = express();

let router = express.Router();

router.get("/", function (req, res, next) {
  req.url = "/index.html";
  next();
});

app.use(router);

// 每次配置都需要重新启动服务
// 假数据
var appData = require("./data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// API路由
var apiRoutes = express.Router();

apiRoutes.get("/seller", function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRoutes.get("/goods", function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get("/ratings", function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use("/api", apiRoutes);

app.use(express.static("./dist"));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at http://localhost: " + port + "\n");
});
