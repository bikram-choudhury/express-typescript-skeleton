import App from './app'
import { controllerType } from './models/contoller.type';
import IndexController from './routes/index';

const routeControllers: controllerType[]  = [{
    path: '/',
    controller: new IndexController()
}]
const app = new App(routeControllers);

app.startServer();

