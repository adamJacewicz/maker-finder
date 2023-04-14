import { Method } from '@/utils/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { findMatch } from '@/services/match.service';
import onlyAuth from '@/hooks/only-auth';
import { processProfile } from '@/services/profile.service';

const profilesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.currentUser) return;
  const userId = req.currentUser.id;
  switch (req.method) {
    case Method.POST: {
      try {
        const { targetUser, hasMatch } = await processProfile({ ...req.body, userId });
        const nextProfile = await findMatch(userId);
        res.status(200).json({ targetUser, hasMatch, nextProfile });
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json({ hasMatch: false, targetUser: null, error });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default onlyAuth(profilesApi);
