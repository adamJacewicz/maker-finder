import onlyAuth from '../../../hooks/only-auth';
import { getAllConversations } from '../../../services/conversation.service';
import { Method } from '../../../utils/constants';

const conversationApi = async (req, res) => {
  switch (req.method) {
    case Method.GET: {
      try {
        const conversations = await getAllConversations({ userId: req.currentUser.id });
        const unread = 0;

        res.status(200).json({ conversations, unread });
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json({ conversations: [], unread: 0, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(conversationApi);
