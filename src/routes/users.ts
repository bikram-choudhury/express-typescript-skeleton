import express, { Request, Response, NextFunction, Router } from 'express';

export default class UserController {
  private path: string = '/';
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRouter();
  }
  private initializeRouter(): void {
    this.router.get(this.path, this.renderUserView)
  }
  private renderUserView = (request: Request, response: Response, next: NextFunction) => {
    response.render('user', { title: 'Express', name: 'Bikram Choudhury' });
  }
}
