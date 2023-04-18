import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';
import { HttpMethod } from '@/utils/constants';
import onlyAuth from '@/hooks/only-auth';
import {getUserById, updateUser} from "@/services/user.service";

const userProfileApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.currentUser) return;
  switch (req.method) {
    case HttpMethod.GET: {
      try {
        const user = getUserById(req.currentUser.id);
        res.status(200).json({ user });
      } catch (error) {
        res.status(422).json({ user: null, error });
      }
      break;
    }
    case HttpMethod.PUT: {
      try {
        const user = await updateUser(req.currentUser.id, req.body);
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
