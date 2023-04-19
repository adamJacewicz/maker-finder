import onlyAuth from '@/hooks/only-auth';
import { getAllConversations } from '@/services/conversation.service';
import { HttpMethod } from '@/utils/constants';
import { NextApiHandler } from 'next';

const conversationApi: NextApiHandler = async (req, res) => {
  const userId = req.currentUser?.id;
  if (!userId) return;
  switch (req.method) {
    case HttpMethod.GET: {
      try {
        const conversations = await getAllConversations(userId, req.query.searchTerm ?? "");
        res.status(200).json(conversations);
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json(error);
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi);
