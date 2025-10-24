import { Request, Response } from 'express';
import { FetchService } from '../service/fetch.service';
export class CountryController {
  static async getCountry(req: Request, res: Response) {
    const url = `${process.env['APIFILM_URL']}/v1/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=asc&sort_lang=long-tieng&category=hanh-dong&country=trung-quoc&year=2024&limit=10`;

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
