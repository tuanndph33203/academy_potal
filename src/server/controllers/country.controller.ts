import { Request, Response } from 'express';
import { FetchService } from '../service/fetch.service';
export class CountryController {
  static async getCountry(req: Request, res: Response) {
    const url = `quoc-gia`;

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
