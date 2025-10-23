import { Request, Response } from 'express';
import https from 'https';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // ép IPv4

export class FilmController {
  static async getNewUpdatesV3(req: Request, res: Response) {
    const url = 'https://phimapi.com/danh-sach/phim-moi-cap-nhat';
    console.log('🌐 Fetching:', url);

    const agent = new https.Agent({
      rejectUnauthorized: false,
      keepAlive: true,
      family: 4, // ép dùng IPv4
    });

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 45000); // 45s

      const resp = await fetch(url, {
        //@ts-expect-error
        agent,
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi,en;q=0.9',
        },
      });
      clearTimeout(id);

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      console.log(`✅ OK: ${data.items?.length || 0} items`);
      return res.json({ status: true, items: data.items || data });
    } catch (e: any) {
      console.error('❌ Fetch failed:', e.message);
      return res.status(502).json({
        status: false,
        message: 'Không gọi được PhimAPI (fetch)',
        items: [],
      });
    }
  }
}
