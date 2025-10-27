import { Router } from 'express';
import { FilmController } from '../controllers/film.controller.js';

const routerFilms = Router();

routerFilms.get('/phim-moi-cap-nhat-v3', FilmController.getNewUpdatesV3);
routerFilms.get('/:type', FilmController.getFilm);

export default routerFilms;
