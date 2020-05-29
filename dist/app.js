Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  const newObj = {};
  if (obj != null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// require('dotenv/config');
const _express = require('express');

const _express2 = _interopRequireDefault(_express);
const _node = require('@sentry/node');

const Sentry = _interopRequireWildcard(_node);
// import Youch from 'youch';
require('express-async-errors');
const _path = require('path');

const _path2 = _interopRequireDefault(_path);
const _cors = require('cors');

const _cors2 = _interopRequireDefault(_cors);
const _sentry = require('./config/sentry');

const _sentry2 = _interopRequireDefault(_sentry);
const _routes = require('./routes');

const _routes2 = _interopRequireDefault(_routes);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0);

    Sentry.init(_sentry2.default);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(_express2.default.json());
    this.server.use(_cors2.default.call(void 0, ''));
    this.server.use(
      '/files',
      _express2.default.static(
        _path2.default.resolve(__dirname, '..', 'temp', 'uploads')
      )
    );
  }

  routes() {
    this.server.use(_routes2.default);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // this.server.use(async (err, req, res, next) => {
    //   if (process.env.NODE_ENV === 'development') {
    //     const errors = await new Youch(err, req).toJSON();
    //     return res.status(500).json(errors);
    //   }
    // });
  }
}

exports.default = new App().server;
