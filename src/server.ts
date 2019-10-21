import App from './app'
import { controllerType } from './models/contoller.type';
import IndexController from './routes/index';
import UserController from './routes/users';

const routeControllers: controllerType[]  = [{
    path: '/',
    controller: new IndexController()
}, {
    path: '/user',
    controller: new UserController()
}]
const app = new App(routeControllers);

app.startServer();

