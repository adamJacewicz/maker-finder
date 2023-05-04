import { createMessage, getConversation } from '@/services/conversation.service';
import onlyAuth from '@/hooks/only-auth';
import { HttpMethod } from '@/utils/constants';
import { NextApiHandler } from 'next';
import { messageSchema } from '@/utils/schemas';

const conversationApi: NextApiHandler = async (req, res) => {
  const conversationId = Number(req.query.id);
  const userId = req.currentUser?.id;
  if (!userId) return;
  switch (req.method) {
    case HttpMethod.POST: {
      try {
        messageSchema.parse({ message: req.body.content });
        const message = await createMessage({
          content: req.body.content,
          userId,
          conversationId,
        });
        res.status(200).json({ message });
      } catch (error) {
        res.status(422).json({ error });
      }
      break;
    }
    case HttpMethod.GET: {
      try {
        const conversation = await getConversation(conversationId, userId);
        if (!conversation) {
          throw Error('conversation_not_found');
        }
        res.status(200).json(conversation);
      } catch (error) {
        res.status(422).json(error);
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi);
