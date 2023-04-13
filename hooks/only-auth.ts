import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const onlyAuth = (handler: NextApiHandler): NextApiHandler=> {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.',
      });
    }

    req.currentUser = session.user;
    return handler(req, res);
  };
};

export default onlyAuth;
