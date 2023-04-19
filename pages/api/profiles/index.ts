import { HttpMethod } from '@/utils/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { findMatch } from '@/services/match.service';
import onlyAuth from '@/hooks/only-auth';
import { processProfile } from '@/services/match.service';
import { initConversation } from '@/services/conversation.service';

const profilesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.currentUser?.id;
  if (!userId) return;
  switch (req.method) {
    case HttpMethod.POST: {
      try {
        const { targetId, liked } = req.body;
        const { targetUser, hasMatch } = await processProfile({ targetId, liked, userId });
        if (hasMatch) await initConversation([userId, targetId]);
        const nextProfile = await findMatch(userId);
        res.status(200).json({ targetUser, hasMatch, nextProfile });
      } catch (error) {
        res.status(422).json({ hasMatch: false, targetUser: null, error });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default onlyAuth(profilesApi);
