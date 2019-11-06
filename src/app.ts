import createError from 'http-errors';
import express, { Request, Response, NextFunction, Application } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { controllerType } from './models/contoller.type';
import mongoose, { connect } from 'mongoose';

export default class App {
  private app: Application;
  private PORT: number = 3000;

  constructor(controllers: controllerType[], port?: number) {
    this.connectAppToDB();
    this.app = express();
    port && (this.PORT = port);
    this.config();
    this.initializeRouteControllers(controllers);
    this.registerErrorHandlers();
  }
  private connectAppToDB() {
    if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
      connect('mongodb://<username>:<password>@ds263856.mlab.com:63856/<mongodb-name>', (err: any) => {
        if (err) throw new Error(err);
        console.log("Connected successfully");
      });
    } else {
      connect('mongodb://localhost:27017/userposts');
    }
  }
  private config(): void {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

  }
  private initializeRouteControllers(routes: any[]) {
    routes.forEach(route => this.app.use(route.path, route.controller.router));
  }
  private registerErrorHandlers(): void {
    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
  public startServer(): void {
    if (this.app) {
      this.app.listen(this.PORT, () => console.log(`Server started at ${this.PORT}`));
    } else {
      console.log('Express is not initialized !');
    }
  }
}