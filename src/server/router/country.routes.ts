import { Router } from 'express';
import { CountryController } from '../controllers/country.controller.js';

const routerCountry = Router();

routerCountry.get('', CountryController.getCountry);

export default routerCountry;
