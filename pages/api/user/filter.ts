import onlyAuth from '@/hooks/only-auth';
import { getFilter, upsertFilter } from '@/services/filter.service';
import { HttpMethod } from '@/utils/constants';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.currentUser) return;
  switch (req.method) {
    case HttpMethod.PUT: {
      try {
        const filter = await upsertFilter(req.currentUser.id, req.body);
        res.status(200).json({ filter });
      } catch (error) {
        res.status(422).json({ filter: null, error });
      }
      break;
    }
    case HttpMethod.GET: {
      try {
        const filter = await getFilter(req.currentUser.id);
        res.status(200).json({ filter });
      } catch (error) {
        res.status(422).json({ filter: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(handler);
