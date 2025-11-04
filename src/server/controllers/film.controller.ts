import { Request, Response } from 'express';
import { FetchService } from '../service/fetch.service';
export class FilmController {
  static async getNewUpdatesV3(req: Request, res: Response) {
    const url = `danh-sach/phim-moi-cap-nhat-v3?limit=6`;

    const result = await FetchService.getJson(url);
    if (result.success) {
      let items = result.data.items || result.data;
      const top6 = (Array.isArray(items) ? items : [])
        .filter((m) => m.tmdb && m.tmdb.vote_count > 0)
        .sort((a, b) => {
          // Ưu tiên vote_average cao hơn trước
          if (b.tmdb.vote_average !== a.tmdb.vote_average) {
            return b.tmdb.vote_average - a.tmdb.vote_average;
          }
          // Nếu bằng nhau → ưu tiên vote_count nhiều hơn
          return b.tmdb.vote_count - a.tmdb.vote_count;
        })
        .slice(0, 6);

      return res.json({
        status: true,
        count: top6.length,
        items: top6,
      });
    }
    return res.status(502).json({
      status: false,
      message: 'Không gọi được PhimAPI (fetch)',
      items: [],
    });
  }
  static async getFilms(req: Request, res: Response) {
    const { type } = req.params;
    const query = req.query;
    if (!type) {
      return res.status(400).json({ success: false, error: 'Thiếu tham số type' });
    }
    const url = `v1/api/danh-sach/${type}`;
    const result = await FetchService.getJson(url, query);
    if (result.success) {
      return res.json({
        status: true,
        items: result.data.items || result.data,
      });
    }
    return res.status(502).json({
      status: false,
      message: 'Không gọi được country (fetch)',
      items: [],
    });
  }
  static async getFilm(req: Request, res: Response) {
    console.log(req.params); /// ParamsAsMap { params: { slug: 'ngoi-truong-xac-song' } }

    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Thiếu tham số slug' });
    }
    const url = `phim/${slug}`;
    const result = await FetchService.getJson(url);
    if (result.success) {
      return res.json({
        status: true,
        items: result.data.items || result.data,
      });
    }
    return res.status(502).json({
      status: false,
      message: 'Không gọi được country (fetch)',
      items: [],
    });
  }
}
