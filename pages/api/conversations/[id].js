import { createConversation, getConversation } from '../../../services/conversation.service';
import onlyAuth from '../../../hooks/only-auth';
import {Method} from "../../../utils/constants";

const conversationApi = async (req, res) => {
  const conversationId = req.query.id;
  const userId = req.currentUser.id;
  switch (req.method) {
    case Method.POST: {
      try {
        const conversation = await createConversation({
          ...req.body,
          userId,
          conversationId,
        });

        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error: error.message });
      }
      break;
    }
    case Method.GET: {
      try {
        const conversation = await getConversation(conversationId, userId);
        if (!conversation) {
          throw Error('conversation_not_found');
        }
        res.status(200).json({ conversation });
      } catch (error) {
        res.status(422).json({ conversation: null, error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi);
