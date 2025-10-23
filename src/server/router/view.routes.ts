import { Router } from 'express';
import { ViewController } from '../controllers/view.controller.js';

const routerViews = Router();

routerViews.post('/:slug', ViewController.increaseView);
routerViews.get('/top/:type', ViewController.getTop);

export default routerViews;
