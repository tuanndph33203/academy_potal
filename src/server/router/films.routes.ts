import { Router } from 'express';
import { FilmController } from '../controllers/film.controller.js';

const routerFilm = Router();

routerFilm.get('/:slug', FilmController.getFilm);

export default routerFilm;
