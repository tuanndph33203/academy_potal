import express, { Router } from 'express';
import { join } from 'node:path';
import cors from 'cors';
import routerViews from './router/view.routes';
import routerFilms from './router/film.routes';

const app = express();
const router = Router();
const PORT = process.env['PORT'] || 4000;
const browserDistFolder = join(import.meta.dirname, '../browser');

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// connectDB();

router.use('/views', routerViews);
router.use('/danh-sach', routerFilms);
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
export { app, browserDistFolder };
