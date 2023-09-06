"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = _interopRequireDefault(require("./config.js"));
var _express = _interopRequireDefault(require("express"));
var _sharePointRoutes = _interopRequireDefault(require("./routes/sharePoint.routes.js"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _winston = _interopRequireDefault(require("winston"));
var _expressWinston = _interopRequireDefault(require("express-winston"));
var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));
var app = (0, _express["default"])();
app.set('trust proxy', 1);
app.set('port', _config["default"].port);
//middlewares

//configuracion de winston
var transport = new _winstonDailyRotateFile["default"]({
  filename: 'src/logs/api-sharepoint-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});
var logger = _winston["default"].createLogger({
  transports: [transport]
});

//configuracion de cors
var corsOptions = {
  origin: ['https://app.cumbredental.cl'],
  methods: 'GET,POST,DELETE',
  maxAge: 600
};
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json({
  limit: '50mb'
}));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_expressWinston["default"].logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms - User: {{req.user?.id || 'unknown'}} - IP: {{req.ip}}",
  colorize: true,
  dynamicMeta: function dynamicMeta(req, res) {
    var _req$user, _req$user2;
    return {
      user_id: (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id,
      user_name: (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.username,
      query_params: req.query
    };
  }
}));
app.use('/', _sharePointRoutes["default"]);
app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});
var IS_PRODUCTION = process.env.NODE_ENV === 'production';
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  if (IS_PRODUCTION) {
    res.status(500).send('Error interno del servidor');
  } else {
    res.status(500).send(err.stack);
  }
});
var _default = app;
exports["default"] = _default;