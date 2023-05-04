import React, { FC, useEffect, useRef } from 'react';
import {
  Conversation as ConversationType,
  ConversationMessageExtended,
  CurrentUser,
} from '@/types/model';
import useSWR, { Fetcher } from 'swr';
import restClient from '@/rest-client';
import UserAvatar from '@/components/UserAvatar';
import { User } from 'next-auth';
import { isBeforeDay } from '@/utils/helpers';
import Message from '@/components/Message';
import ChatInput from '@/components/ChatInput';

const Conversation: FC<{
  initConversation?: ConversationType;
  currentUser: CurrentUser;
}> = ({ initConversation, currentUser }) => {
  const lastListElementRef = useRef<HTMLDivElement | null>(null);
  const { data: conversation } = useSWR(
    initConversation ? `/api/conversations/${initConversation.id}` : null,
    restClient.fetcher as Fetcher<ConversationType | undefined, string>,
    {
      fallbackData: initConversation,
    },
  );
  useEffect(() => {
    if (!lastListElementRef.current) return;
    lastListElementRef.current.scrollIntoView();
  }, [conversation?.messages]);

  if (!conversation) return <h5>NO DATA</h5>;

  const receiver = conversation.users.find(({ user }) => user.id !== currentUser.id)?.user as User;

  const messages = conversation.messages.map<ConversationMessageExtended>(
    (message, i, messages) => ({
      ...message,
      isMine: message.user.id === currentUser?.id,
      renderDate: i > 0 ? isBeforeDay(messages[i - 1].createdAt, message.createdAt) : false,
    }),
  );

  return (
    <div className="col-span-12 xl:col-span-9 flex flex-col overflow-hidden  p-6">
      <div className="bg-base-700 flex items-center px-5 py-4 rounded-md">
        <div className="image-fit mr-1">
          <UserAvatar user={receiver} />
          <div className="bg-green-500 w-3 h-3 absolute right-0 bottom-0 rounded-full border border-white"></div>
        </div>
        <div className="ml-2 overflow-hidden">
          <a href="#" className="text-base font-medium">
            {receiver.name}
          </a>
          <div className="text-gray-600">Online</div>
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hidden flex-1 max-h-full rounded-xl p-2">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={lastListElementRef} />
      </div>
      <ChatInput conversationId={conversation.id} />
    </div>
  );
};

export default Conversation;
