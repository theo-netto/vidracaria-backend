import { Router } from 'express';

import Multer from 'multer';

import UserController from './app/Controller/UserController';
import SessionController from './app/Controller/SessionController';
import FileController from './app/Controller/FileController';
import ProviderController from './app/Controller/ProviderController';
import ClientController from './app/Controller/ClientController';
import ActionController from './app/Controller/ActionController';
import BudgetController from './app/Controller/BudgetController';
import CancellationController from './app/Controller/CancellationController';
import FinishController from './app/Controller/FinishController';
import AddressController from './app/Controller/AddressController';
import TotalController from './app/Controller/TotalController';
import PendingBudgetController from './app/Controller/PendingBudgetController';

import authMiddlewares from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const multer = Multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.post('/files', multer.single('file'), FileController.store);

routes.get('/actions/budget/:id', ActionController.show); //ok
routes.post('/actions', ActionController.store); //ok
routes.get('/actions', ActionController.index); //ok
routes.put('/actions/:id', ActionController.update); //n vou colocar fds

routes.get('/providers', ProviderController.index); //ok
routes.get('/providers/:id', ProviderController.show); //ok
routes.post('/providers', ProviderController.store); //ok
routes.put('/providers/:id', ProviderController.update); //ok
routes.delete('/providers/:id', ProviderController.delete);

routes.get('/clients', ClientController.index); //ok
routes.get('/clients/:id', ClientController.show); //ok
routes.post('/clients', ClientController.store); //ok
routes.put('/clients/:id', ClientController.update); //ok
routes.delete('/clients/:id', ClientController.delete);

routes.get('/budgets', BudgetController.index); //ok
routes.get('/budgets/one/:id', BudgetController.show); //ok
routes.get('/budgets/pending', PendingBudgetController.index); //ok
routes.post('/budgets', BudgetController.store); //ok
routes.put('/budgets/:id', BudgetController.update); //ok
routes.delete('/budgets/:id', BudgetController.delete);

routes.get('/budgets/cancelled', CancellationController.index); //ok
routes.put('/budgets/:id/cancellation', CancellationController.update);

routes.get('/budgets/finish', FinishController.index); //ok
routes.put('/budgets/:id/finish', FinishController.update);

routes.post('/address', AddressController.store); //ok
routes.put('/address/:id', AddressController.update); //ok

// TotalController

routes.get('/actions/total', TotalController.index); //ok
routes.get('/actions/total/budget/:id', TotalController.show); //ok

export default routes;
