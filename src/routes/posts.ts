import express, { Request, Response, NextFunction, Router } from 'express';
import fetch from 'node-fetch';


export default class PostController {
    private path: string = '/';
    private ApiHost: string = 'https://jsonplaceholder.typicode.com';
    public router: Router;

    constructor() {
        this.router = express.Router();
        // this.fetchPosts = this.fetchPosts.bind(this);
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}:postId?`, this.fetchPosts);
    }
    private fetchPosts = (request: Request, response: Response, next: NextFunction): void => {
        const userid = request.query && request.query.usercode || null;
        const postid = request.params && request.params.postId || null;

        const postsApi = `${this.ApiHost}/posts${postid? `/${postid}`: ''}${userid ? `?userId=${userid}`: ''}`;
        fetch(postsApi)
        .then(res => res.json())
        .then(json => response.json(json))
        
    }
}