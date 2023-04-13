import onlyAuth from '@/hooks/only-auth';
import { upsertFilter } from '@/services/filter.service';
import { Method } from '@/utils/constants';

export default onlyAuth(async (req, res) => {
  switch (req.method) {
    case Method.PUT: {
      try {
        const filter = req.currentUser && (await upsertFilter(req.currentUser.id, req.body));
        res.status(200).json({ filter });
      } catch (error) {
        res.status(422).json({ filter: null, error });
      }
      break;
    }
    default:
      res.status(400);
  }
});
