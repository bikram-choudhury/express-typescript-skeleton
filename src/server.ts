import App from './app'
import { controllerType } from './models/contoller.type';
import IndexController from './routes/index';
import UserController from './routes/users';
import PostController from './routes/posts';

const routeControllers: controllerType[]  = [{
    path: '/',
    controller: new IndexController()
}, {
    path: '/user',
    controller: new UserController()
}, {
    path: '/posts',
    controller: new PostController()
}]
const app = new App(routeControllers);

app.startServer();

