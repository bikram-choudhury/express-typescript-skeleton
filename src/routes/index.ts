import express, { Request, Response, NextFunction, Router } from "express";
import async from 'async';

import USER from '../schemas/users';

export default class IndexController {
  private path: string = '/';
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(this.path, this.fetchUsers, this.indexRenderer);
    this.router.post(this.path, this.handlePostRequest);
    this.router.get(`${this.path}edit/:username`, this.fetchUsers, this.indexRenderer);
  }
  handlePostRequest = (req: Request, res: Response, next: NextFunction): void => {
    const body: { [key: string]: string } = req.body || null;

    if (body && Object.keys(body).length && body.username) {
      const user = new USER(body);
      user.save((error, doc) => {
        if (error) res.send(error);
        else res.redirect('/');
      })
    }
  }
  fetchUsers = (req: any, res: Response, next: NextFunction): void => {
    const username = req.params.username || null;

    async.parallel([
      (callback) => {
        USER.find({}, { name: 1, username: 1, email: 1 }, (error, users) => {
          if (error) {
            callback(error);
          }
          else {
            callback(null, users);
          }
        })
      },
      (callback) => {
        if (username) {
          USER.findOne({ username }, { name: 1, username: 1, email: 1 }, (error, user) => {
            if (error) {
              callback(error);
            }
            else {
              callback(null, user)
            }
          })
        } else {
          callback(null, null);
        }
      }
    ], (error, result: any) => {
      if(error) {
        res.send(error);
        return;
      }
      req.users = result[0];
      req.user = result[1];
      next();
    })


  }
  indexRenderer = (req: any, res: Response, next: NextFunction): void => {
    const users = req.users || null;
    const user = req.user || null;
    res.render('index', { title: 'Express', users, user });
  }
}
