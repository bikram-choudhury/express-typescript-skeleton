import express, { Request, Response, NextFunction, Router } from "express";

export default class IndexController {
  private path: string = '/';
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(this.path, this.indexRenderer)
  }
  indexRenderer = (req: Request, res: Response, next: NextFunction): void => {
    res.render('index', { title: 'Express' });
  }
}
