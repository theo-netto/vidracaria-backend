"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _UserController = require('./app/Controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/Controller/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/Controller/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _ProviderController = require('./app/Controller/ProviderController'); var _ProviderController2 = _interopRequireDefault(_ProviderController);
var _ClientController = require('./app/Controller/ClientController'); var _ClientController2 = _interopRequireDefault(_ClientController);
var _ActionController = require('./app/Controller/ActionController'); var _ActionController2 = _interopRequireDefault(_ActionController);
var _BudgetController = require('./app/Controller/BudgetController'); var _BudgetController2 = _interopRequireDefault(_BudgetController);
var _CancellationController = require('./app/Controller/CancellationController'); var _CancellationController2 = _interopRequireDefault(_CancellationController);
var _FinishController = require('./app/Controller/FinishController'); var _FinishController2 = _interopRequireDefault(_FinishController);
var _AddressController = require('./app/Controller/AddressController'); var _AddressController2 = _interopRequireDefault(_AddressController);
var _TotalController = require('./app/Controller/TotalController'); var _TotalController2 = _interopRequireDefault(_TotalController);
var _PendingBudgetController = require('./app/Controller/PendingBudgetController'); var _PendingBudgetController2 = _interopRequireDefault(_PendingBudgetController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = new (0, _express.Router)();
const multer = _multer2.default.call(void 0, _multer4.default);

routes.post('/users', _UserController2.default.store);
routes.post('/session', _SessionController2.default.store);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);

routes.post('/files', multer.single('file'), _FileController2.default.store);

routes.get('/actions/budget/:id', _ActionController2.default.show); //ok
routes.post('/actions', _ActionController2.default.store); //ok
routes.get('/actions', _ActionController2.default.index); //ok
routes.put('/actions/:id', _ActionController2.default.update); //n vou colocar fds

routes.get('/providers', _ProviderController2.default.index); //ok
routes.get('/providers/:id', _ProviderController2.default.show); //ok
routes.post('/providers', _ProviderController2.default.store); //ok
routes.put('/providers/:id', _ProviderController2.default.update); //ok
routes.delete('/providers/:id', _ProviderController2.default.delete);

routes.get('/clients', _ClientController2.default.index); //ok
routes.get('/clients/:id', _ClientController2.default.show); //ok
routes.post('/clients', _ClientController2.default.store); //ok
routes.put('/clients/:id', _ClientController2.default.update); //ok
routes.delete('/clients/:id', _ClientController2.default.delete);

routes.get('/budgets', _BudgetController2.default.index); //ok
routes.get('/budgets/one/:id', _BudgetController2.default.show); //ok
routes.get('/budgets/pending', _PendingBudgetController2.default.index); //ok
routes.post('/budgets', _BudgetController2.default.store); //ok
routes.put('/budgets/:id', _BudgetController2.default.update); //ok
routes.delete('/budgets/:id', _BudgetController2.default.delete);

routes.get('/budgets/cancelled', _CancellationController2.default.index); //ok
routes.put('/budgets/:id/cancellation', _CancellationController2.default.update);

routes.get('/budgets/finish', _FinishController2.default.index); //ok
routes.put('/budgets/:id/finish', _FinishController2.default.update);

routes.post('/address', _AddressController2.default.store); //ok
routes.put('/address/:id', _AddressController2.default.update); //ok

// TotalController

routes.get('/actions/total', _TotalController2.default.index); //ok
routes.get('/actions/total/budget/:id', _TotalController2.default.show); //ok

exports. default = routes;
