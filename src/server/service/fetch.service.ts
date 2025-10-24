export class FetchService {
  static async getJson(url: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi,en;q=0.9',
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { success: true, data };
    } catch (err: any) {
      console.error('❌ Fetch failed:', err);
      return { success: false, error: err.message };
    }
  }
}
