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
  conversation: ConversationType;
  currentUser: CurrentUser;
}> = ({ conversation, currentUser }) => {
  const lastListElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastListElementRef.current) return;
    lastListElementRef.current.scrollIntoView();
  }, [conversation?.messages]);

  const receiver = conversation.users.find(({ user }) => user.id !== currentUser.id)?.user as User;

  const messages = conversation.messages.map<ConversationMessageExtended>(
    (message, i, messages) => ({
      ...message,
      isMine: message.user.id === currentUser?.id,
      renderDate: i > 0 ? isBeforeDay(messages[i - 1].createdAt, message.createdAt) : false,
    }),
  );

  return (
    <div className="col-span-12 xl:col-span-9 flex flex-col overflow-hidden p-3">
      <div className="bg-base-700 flex items-center px-5 py-3 rounded-md">
        <div className="image-fit mr-1">
          <UserAvatar user={receiver} />
        </div>
        <div className="ml-2 overflow-hidden text-base font-medium">
          {receiver.name}
          <div className="text-gray-600">Online</div>
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hidden flex-1 max-h-full rounded-xl p-6">
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
