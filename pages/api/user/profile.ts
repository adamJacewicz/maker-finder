import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';
import { Method } from '@/utils/constants';
import onlyAuth from '@/hooks/only-auth';
import { updateProfile } from '@/services/profile.service';

const userProfileApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.currentUser) return;
  switch (req.method) {
    case Method.GET: {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: req.currentUser.id,
          },
          include: {
            filter: true,
          },
        });
        res.status(200).json({ user });
      } catch (error) {
        res.status(422).json({ user: null, error });
      }
      break;
    }
    case Method.PUT: {
      try {
        const user = await updateProfile(req.currentUser.id, req.body);
        res.status(200).json({user});
      } catch (error) {
        res.status(422).json({ user: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(userProfileApi);
