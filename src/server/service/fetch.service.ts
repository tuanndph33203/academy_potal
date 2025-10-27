import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface CacheEntry {
  time: number;
  data: any;
}

export class FetchService {
  private static cache = new Map<string, CacheEntry>();
  private static readonly TTL = 24 * 60 * 60 * 1000; // cache sống 10 phút
  private static readonly CACHE_DIR = path.join(process.cwd(), '.cache');

  /** Gọi API, có cache + fallback khi lỗi */
  static async getJson(url: string, query?: any) {
    const queryString = this.buildQuery(query);

    const fullUrl = `${process.env['APIFILM_URL']}/${url}${queryString}`;
    const cacheKey = `${url}${queryString}`;
    const now = Date.now();

    // 🔍 Nếu có cache trong RAM và còn hạn
    const entry = this.cache.get(cacheKey);
    if (entry && now - entry.time < this.TTL) {
      return { success: true, data: entry.data, fromCache: true };
    }

    try {
      console.log(`🌐 Fetching: ${fullUrl}`);
      const response = await fetch(fullUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi,en;q=0.9',
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // ✅ Cập nhật cache RAM
      this.cache.set(url, { time: now, data });

      // ✅ Lưu thêm bản sao ra file (cache bền)
      this.saveToFile(url, data);

      return { success: true, data, fromCache: false };
    } catch (err: any) {
      console.error('❌ Fetch failed:', err.message);

      // 🔁 Nếu có cache cũ trong RAM → dùng tạm
      if (entry) {
        console.warn('⚠️ Using in-memory cache fallback');
        return { success: true, data: entry.data, fromCache: true };
      }

      // 🔁 Nếu có cache trong file → dùng tạm
      const fileData = this.loadFromFile(url);
      if (fileData) {
        console.warn('⚠️ Using file cache fallback');
        return { success: true, data: fileData, fromCache: true };
      }

      // ❌ Không có cache → lỗi thật
      return { success: false, error: err.message };
    }
  }

  /** Lưu cache xuống file */
  private static saveToFile(key: string, data: any) {
    try {
      if (!fs.existsSync(this.CACHE_DIR)) fs.mkdirSync(this.CACHE_DIR);
      const file = path.join(this.CACHE_DIR, `${this.sanitize(key)}.json`);
      fs.writeFileSync(file, JSON.stringify({ time: Date.now(), data }, null, 2), 'utf-8');
    } catch (e) {
      console.error('⚠️ Cannot write cache file:', e);
    }
  }

  /** Đọc cache từ file */
  private static loadFromFile(key: string) {
    try {
      const file = path.join(this.CACHE_DIR, `${this.sanitize(key)}.json`);
      if (!fs.existsSync(file)) return null;

      const content = JSON.parse(fs.readFileSync(file, 'utf-8')) as CacheEntry;
      const now = Date.now();
      if (now - content.time < this.TTL) return content.data;

      return null; // hết hạn
    } catch {
      return null;
    }
  }

  /** Loại bỏ ký tự không hợp lệ khi lưu file */
  private static sanitize(key: string) {
    return key.replace(/[^a-z0-9]/gi, '_');
  }
  /** Chuyển object query thành query string (VD: {page:2, q:'abc'} → '?page=2&q=abc') */
  private static buildQuery(query?: Record<string, any>): string {
    if (!query || Object.keys(query).length === 0) return '';
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    }

    return `?${params.toString()}`;
  }
}
