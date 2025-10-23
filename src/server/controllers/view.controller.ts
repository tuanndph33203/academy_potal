import { Request, Response } from 'express';
import { ViewModel } from '../models/view.models';
import dayjs from 'dayjs';

export class ViewController {
  static async increaseView(req: Request, res: Response) {
    try {
      const { slug } = req.body;
      if (!slug) {
        return res.status(400).json({ error: 'Missing slug parameter' });
      }
      const today = dayjs().format('YYYY-MM-DD');
      let viewDoc = await ViewModel.findOne({ date: today });

      if (!viewDoc) {
        viewDoc = await ViewModel.create({
          date: today,
          items: [{ slug, view: 1 }],
        });
      } else {
        const movieIndex = viewDoc.items.findIndex((item: any) => item.slug === slug);
        if (movieIndex >= 0) {
          viewDoc.items[movieIndex].view += 1;
        } else {
          viewDoc.items.push({ slug, view: 1 });
        }
        await viewDoc.save();
      }
      return res.json({ message: '✅ View increased successfully', slug });
    } catch (err) {
      console.error('❌ increaseView error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getTop(req: Request, res: Response) {
    try {
      const { type = 'day' } = req.query;
      const now = dayjs();
      let startDate: string;
      let endDate: string;

      if (type === 'day') {
        startDate = now.startOf('day').format('YYYY-MM-DD');
        endDate = now.endOf('day').format('YYYY-MM-DD');
      } else if (type === 'month') {
        startDate = now.startOf('month').format('YYYY-MM-DD');
        endDate = now.endOf('month').format('YYYY-MM-DD');
      } else if (type === 'year') {
        startDate = now.startOf('year').format('YYYY-MM-DD');
        endDate = now.endOf('year').format('YYYY-MM-DD');
      } else {
        return res.status(400).json({ error: 'Invalid type parameter' });
      }

      const topMovies = await ViewModel.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.slug',
            totalViews: { $sum: '$items.view' },
          },
        },
        { $sort: { totalViews: -1 } },
        { $limit: 10 },
      ]);

      return res.json({
        type,
        range: { startDate, endDate },
        topMovies,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
